const puppeteer = require('puppeteer')

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('styles')
	let name = 'Resume'
	eleventyConfig.addShortcode('name', function(shortcodeName) {
		if (shortcodeName) {
			name = shortcodeName
		}
	})
	eleventyConfig.on('afterBuild', () => {
		(async () => {
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			await page.goto('http://localhost:8080/README/', {
				waitUntil: 'networkidle2',
			})
			await page.pdf({ path: `${name}.pdf`, format: 'a4', scale: 0.84 })
			await browser.close()
		})()
	})
}