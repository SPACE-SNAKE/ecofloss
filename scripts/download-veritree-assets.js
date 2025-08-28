const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

class VeritreeAssetDownloader {
  constructor() {
    this.baseUrl = 'https://www.veritree.com';
    this.visitedUrls = new Set();
    this.downloadedAssets = new Set();
    this.assetQueue = new Set();
    this.assetsDir = path.join(__dirname, '..', 'src', 'assets', 'veritree');
    
    // Asset type directories
    this.directories = {
      images: path.join(this.assetsDir, 'images'),
      videos: path.join(this.assetsDir, 'videos'),
      logos: path.join(this.assetsDir, 'logos'),
      backgrounds: path.join(this.assetsDir, 'backgrounds'),
      icons: path.join(this.assetsDir, 'icons'),
      testimonials: path.join(this.assetsDir, 'testimonials')
    };
  }

  async init() {
    // Create all directories
    for (const dir of Object.values(this.directories)) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    this.browser = await chromium.launch({ 
      headless: true,
      args: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    });
    
    const context = await this.browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    this.page = await context.newPage();
  }

  async downloadFile(url, filename, directory) {
    if (this.downloadedAssets.has(url)) {
      console.log(`⏭️  Already downloaded: ${filename}`);
      return;
    }

    try {
      const filePath = path.join(directory, filename);
      const protocol = url.startsWith('https:') ? https : http;
      
      return new Promise((resolve, reject) => {
        const file = require('fs').createWriteStream(filePath);
        
        const request = protocol.get(url, (response) => {
          if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log(`✅ Downloaded: ${filename} (${response.headers['content-length']} bytes)`);
              this.downloadedAssets.add(url);
              resolve();
            });
          } else if (response.statusCode === 301 || response.statusCode === 302) {
            // Handle redirects
            this.downloadFile(response.headers.location, filename, directory).then(resolve).catch(reject);
          } else {
            console.log(`❌ Failed to download ${filename}: HTTP ${response.statusCode}`);
            file.close();
            require('fs').unlink(filePath, () => {});
            reject(new Error(`HTTP ${response.statusCode}`));
          }
        });

        request.on('error', (err) => {
          console.log(`❌ Error downloading ${filename}: ${err.message}`);
          file.close();
          require('fs').unlink(filePath, () => {});
          reject(err);
        });

        request.setTimeout(30000, () => {
          console.log(`⏰ Timeout downloading ${filename}`);
          request.destroy();
          file.close();
          require('fs').unlink(filePath, () => {});
          reject(new Error('Timeout'));
        });
      });
    } catch (error) {
      console.log(`❌ Failed to download ${url}: ${error.message}`);
    }
  }

  getFileExtension(url) {
    const pathname = new URL(url).pathname;
    return path.extname(pathname).toLowerCase() || '.jpg';
  }

  sanitizeFilename(filename) {
    return filename
      .replace(/[^a-z0-9.-]/gi, '_')
      .replace(/_+/g, '_')
      .substring(0, 100);
  }

  categorizeAsset(url, alt = '', src = '') {
    const urlLower = url.toLowerCase();
    const altLower = alt.toLowerCase();
    const srcLower = src.toLowerCase();
    
    // Videos
    if (urlLower.includes('.mp4') || urlLower.includes('.webm') || urlLower.includes('video')) {
      return 'videos';
    }
    
    // Logos (company logos, brand assets)
    if (altLower.includes('logo') || srcLower.includes('logo') || 
        altLower.includes('brand') || urlLower.includes('logo') ||
        altLower.includes('company') || altLower.includes('partner')) {
      return 'logos';
    }
    
    // Icons
    if (altLower.includes('icon') || urlLower.includes('icon') || 
        altLower.includes('arrow') || altLower.includes('check') ||
        urlLower.includes('svg') && (altLower.includes('icon') || srcLower.includes('icon'))) {
      return 'icons';
    }
    
    // Testimonials and people photos
    if (altLower.includes('testimonial') || altLower.includes('profile') || 
        altLower.includes('person') || altLower.includes('team') ||
        altLower.includes('founder') || altLower.includes('ceo')) {
      return 'testimonials';
    }
    
    // Background images (hero, sections)
    if (altLower.includes('background') || altLower.includes('hero') || 
        altLower.includes('banner') || srcLower.includes('hero') ||
        srcLower.includes('background')) {
      return 'backgrounds';
    }
    
    // Default to images
    return 'images';
  }

  async extractAssetsFromPage(url) {
    try {
      console.log(`🔍 Scanning page: ${url}`);
      await this.page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Extract all images
      const images = await this.page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          alt: img.alt || '',
          dataset: img.dataset || {}
        })).filter(img => img.src && !img.src.startsWith('data:'));
      });

      // Extract background images from CSS
      const backgroundImages = await this.page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        const bgImages = [];
        
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          const bgImage = style.backgroundImage;
          
          if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
            const matches = bgImage.match(/url\(["']?([^"')]+)["']?\)/g);
            if (matches) {
              matches.forEach(match => {
                const url = match.replace(/url\(["']?/, '').replace(/["']?\)$/, '');
                if (!url.startsWith('data:') && (url.startsWith('http') || url.startsWith('//'))) {
                  bgImages.push({
                    src: url.startsWith('//') ? 'https:' + url : url,
                    alt: el.getAttribute('alt') || 'background',
                    dataset: {}
                  });
                }
              });
            }
          }
        });
        
        return bgImages;
      });

      // Extract videos
      const videos = await this.page.evaluate(() => {
        const videoElements = Array.from(document.querySelectorAll('video, video source'));
        return videoElements.map(video => ({
          src: video.src || video.currentSrc,
          alt: video.getAttribute('alt') || 'video',
          dataset: video.dataset || {}
        })).filter(video => video.src && !video.src.startsWith('data:'));
      });

      // Extract Webflow assets
      const webflowAssets = await this.page.evaluate(() => {
        const assets = [];
        
        // Look for Webflow uploaded assets
        document.querySelectorAll('[src*="webflow"], [href*="webflow"], [style*="webflow"]').forEach(el => {
          const src = el.src || el.href;
          if (src && !src.startsWith('data:')) {
            assets.push({
              src: src,
              alt: el.alt || el.textContent?.substring(0, 50) || 'webflow-asset',
              dataset: el.dataset || {}
            });
          }
        });
        
        return assets;
      });

      // Combine all assets
      const allAssets = [...images, ...backgroundImages, ...videos, ...webflowAssets];
      
      console.log(`📊 Found ${allAssets.length} assets on ${url}`);
      console.log(`   - Images: ${images.length}`);
      console.log(`   - Background images: ${backgroundImages.length}`);
      console.log(`   - Videos: ${videos.length}`);
      console.log(`   - Webflow assets: ${webflowAssets.length}`);

      // Queue assets for download
      for (const asset of allAssets) {
        if (!this.downloadedAssets.has(asset.src)) {
          this.assetQueue.add(asset);
        }
      }

      // Find internal links to crawl
      const links = await this.page.evaluate((baseUrl) => {
        const anchors = Array.from(document.querySelectorAll('a[href]'));
        return anchors
          .map(a => a.href)
          .filter(href => 
            href.startsWith(baseUrl) && 
            !href.includes('#') && 
            !href.includes('?') &&
            !href.includes('.pdf') &&
            !href.includes('mailto:')
          );
      }, this.baseUrl);

      return links;
      
    } catch (error) {
      console.log(`❌ Error scanning ${url}: ${error.message}`);
      return [];
    }
  }

  async downloadQueuedAssets() {
    console.log(`\n🚀 Starting download of ${this.assetQueue.size} assets...\n`);
    
    const assets = Array.from(this.assetQueue);
    const batchSize = 5; // Download 5 assets at a time
    
    for (let i = 0; i < assets.length; i += batchSize) {
      const batch = assets.slice(i, i + batchSize);
      
      const downloadPromises = batch.map(async (asset) => {
        const category = this.categorizeAsset(asset.src, asset.alt);
        const extension = this.getFileExtension(asset.src);
        const filename = this.sanitizeFilename(
          asset.alt || `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        ) + extension;
        
        const directory = this.directories[category];
        
        try {
          await this.downloadFile(asset.src, filename, directory);
        } catch (error) {
          console.log(`❌ Failed to download ${asset.src}: ${error.message}`);
        }
      });
      
      await Promise.all(downloadPromises);
      console.log(`\n✅ Completed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(assets.length/batchSize)}\n`);
    }
  }

  async crawlWebsite() {
    const pagesToVisit = [
      this.baseUrl,
      `${this.baseUrl}/about`,
      `${this.baseUrl}/solutions`,
      `${this.baseUrl}/technology`,
      `${this.baseUrl}/impact`,
      `${this.baseUrl}/blog`,
      `${this.baseUrl}/contact`,
      `${this.baseUrl}/careers`
    ];

    for (const pageUrl of pagesToVisit) {
      if (!this.visitedUrls.has(pageUrl)) {
        this.visitedUrls.add(pageUrl);
        
        try {
          const newLinks = await this.extractAssetsFromPage(pageUrl);
          
          // Add discovered links to visit queue (limit depth)
          for (const link of newLinks.slice(0, 3)) { // Limit to avoid infinite crawling
            if (!this.visitedUrls.has(link) && this.visitedUrls.size < 15) {
              pagesToVisit.push(link);
            }
          }
        } catch (error) {
          console.log(`❌ Error processing ${pageUrl}: ${error.message}`);
        }
        
        // Small delay between page visits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  async generateAssetInventory() {
    const inventory = {
      totalAssets: this.downloadedAssets.size,
      categories: {},
      timestamp: new Date().toISOString(),
      downloadedFrom: Array.from(this.visitedUrls)
    };

    // Count assets in each directory
    for (const [category, directory] of Object.entries(this.directories)) {
      try {
        const files = await fs.readdir(directory);
        inventory.categories[category] = files.length;
      } catch (error) {
        inventory.categories[category] = 0;
      }
    }

    const inventoryPath = path.join(this.assetsDir, 'asset-inventory.json');
    await fs.writeFile(inventoryPath, JSON.stringify(inventory, null, 2));
    
    console.log('\n📋 Asset Inventory Generated:');
    console.log(`   📁 Total Assets: ${inventory.totalAssets}`);
    Object.entries(inventory.categories).forEach(([category, count]) => {
      console.log(`   📁 ${category}: ${count} files`);
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

async function main() {
  const downloader = new VeritreeAssetDownloader();
  
  try {
    console.log('🌱 Veritree Asset Downloader Starting...\n');
    
    await downloader.init();
    console.log('✅ Initialized browser and directories\n');
    
    await downloader.crawlWebsite();
    console.log('\n✅ Website crawling completed\n');
    
    await downloader.downloadQueuedAssets();
    console.log('\n✅ Asset downloads completed\n');
    
    await downloader.generateAssetInventory();
    console.log('\n🎉 All done! Assets downloaded to src/assets/veritree/\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  } finally {
    await downloader.close();
  }
}

// Handle script termination
process.on('SIGINT', async () => {
  console.log('\n⏹️  Script interrupted, cleaning up...');
  process.exit(0);
});

// Run the script
if (require.main === module) {
  main();
}

module.exports = { VeritreeAssetDownloader };