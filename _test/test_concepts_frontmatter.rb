require 'test/unit'
require 'set'
require 'yaml'

class TestConceptsFrontmatter < Test::Unit::TestCase

  def test_simple
    assert_equal(4, 4)
    assert_equal(4, 4)
  end

  def test_all_concepts
    concepts = Dir['_concepts/*']

    concepts.each do |file_name|
      f = YAML.load_file(file_name)
      f['tabs'].each do |tab|
        # for each tab, check for the disqus id and disqus url
        assert_not_nil(tab['disqus_identifier'], "#{file_name} is missing a disqus_identifier")
        assert_not_nil(tab['disqus_url'], "#{file_name} is missing a disqus_url")
        assert_not_nil(tab['title'], "#{file_name} is missing a title")
        assert_not_nil(tab['url_hash'], "#{file_name} is missing a url_hash")
        assert_false(tab['url_hash'].start_with?('#'), "The url_hash in #{file_name} should not start with a '#'")
      end
      if f['no_tabs'][0]['archived_text'] != nil
        concept = f['no_tabs'][0]
        assert_not_nil(concept['disqus_identifier'], "#{file_name} is missing a disqus_identifier")
        assert_not_nil(concept['disqus_url'], "#{file_name} is missing a disqus_url")
      end
    end
  end

  def test_duplicate_disqus_ids
    disqus_ids = Set.new
    disqus_urls = Set.new
    concepts = Dir['_concepts/*']

    concepts.each do |file_name|
      f = YAML.load_file(file_name)
      f['tabs'].each do |tab|
        # for each tab, check for the disqus id and disqus url
        assert_not_nil(tab['disqus_identifier'], "#{file_name} is missing a disqus_identifier")
        # try to add the id to the set
        result = disqus_ids.add?(tab['disqus_identifier'])
        assert_not_nil(result, "the disqus_identifier on #{tab['title']} in #{file_name} is not unique")
        # try to add the disqus url to the set
        result = disqus_urls.add?(tab['disqus_url'])
        assert_not_nil(result, "the disqus_url on #{tab['title']} in #{file_name} is not unique")
      end
      if f['no_tabs'][0]['archived_text'] != nil
        concept = f['no_tabs'][0]
        assert_not_nil(concept['disqus_identifier'], "#{file_name} is missing a disqus_identifier")
        # try to add the id to the set
        result = disqus_ids.add?(tab['disqus_identifier'])
        assert_not_nil(result, "the disqus_identifier in #{file_name} is not unique")
        # try to add the disqus url to the set
        result = disqus_urls.add?(tab['disqus_url'])
        assert_not_nil(result, "the disqus_url in #{file_name} is not unique")
      end
    end
  end

end