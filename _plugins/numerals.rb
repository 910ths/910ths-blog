module Jekyll
	class Numerals < Liquid::Tag

		def initialize(tag_name, variable, tokens)

			super
			@variable    = variable.strip
			@arabic_slug = 'ar'
			@numerals    = {
        '1' => '۱',
        '2' => '۲',
        '3' => '۳',
        '4' => '٤',
        '5' => '۵',
        '6' => '٦',
        '7' => '۷',
        '8' => '۸',
        '9' => '۹',
        '0' => '۰'
			}

		end

		def render(context)

			current_lang = context['site.lang']

			content = Liquid::Template.parse(@variable).render context
			content = content.strip

			if current_lang != @arabic_slug

				return content

			end

			for x in @numerals.keys

				if content.include? x
					content = content.gsub(x, @numerals[x])
				end

			end

			return content

		end

	end
end

Liquid::Template.register_tag('numerals', Jekyll::Numerals)