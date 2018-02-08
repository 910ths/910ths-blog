module MinifyHTML

	def minify(content)

		content = content.strip
		content = content.gsub(/\n/, '')
		content = content.gsub(/\t/, '')
		content = content.gsub(/\<!--(.*?)--\>/, '')
		content = content.gsub(/\>\s+\</, '><')

	end

end

Liquid::Template.register_filter(MinifyHTML)