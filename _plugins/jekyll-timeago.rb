require_relative 'jekyll-timeago/core'
require_relative 'jekyll-timeago/version'

if defined?(Liquid)
  require_relative 'jekyll-timeago/filter'
  require_relative 'jekyll-timeago/tag'

  Liquid::Template.register_filter(Jekyll::Timeago::Filter)
  Liquid::Template.register_tag('timeago', Jekyll::Timeago::Tag)
end