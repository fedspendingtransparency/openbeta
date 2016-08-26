## OpenBeta.USAspending.gov

When the new USAspending.gov – the taxpayer site built for taxpayer needs – is launched in May 2017, users will have an open window into government spending. Users will be able to track Federal spending from congressional appropriations down to purchases and grant details -- what was bought, from whom, when, and for how much.

Treasury will be making updates and adding proposed features to the site that looks to gain feedback from the public for how best to display how the Federal government is spending taxpayer money.

## Setup

* Clone the repo into your project directory:

```
git clone https://github.com/fedspendingtransparency/openbeta.git
```

* Change the current directory:

```
cd openbeta
```

* This site uses [Jekyll](https://jekyllrb.com/). To run it:

```
jekyll serve --watch
```

* Open your browser to `http://localhost:4000/dev/`

## Frameworks & Libraries Included:

1. [Jekyll](https://jekyllrb.com/)
2. [Bourbon.io](http://bourbon.io/)
3. [Neat](http://neat.bourbon.io/)
4. [Slick](http://kenwheeler.github.io/slick/)
5. [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
6. [Lightbox](http://lokeshdhakar.com/projects/lightbox2/)
7. [Disqus](https://disqus.com/)

## Adding and Editing Site Content

Page content can be found in either a YAML or Markdown file.

### Header:

* `/_data/header.yml`
* To add new items to the navigation bar, add
```yaml
- text:
  url:
```

### Footer:

* `/_data/footer.yml`

### Home Page (/):

* `/_data/home.yml`
* To add a new slide to the carousel, add the following under the `carousel` line item
```yaml
- usa_intro:
  banner_title:
  banner_label:
  banner_cta:
  banner_cta_link:
  banner_image:
  banner_image_alt_text:
```
* The sections below the carousel are hard coded into position but the content can be updated.

### About Page (/about):

* `/_data/about.yml`

### Contact Page (/contact):

* `/_data/contact.yml`

### Concepts Page (/concepts):

* `/_data/concepts-landing-page.yml`
* Three (3) tabs: Active, Completed, Archived
* When adding a new category, it will auto-populate onto the page

## Topic Pages (/concepts/:path):

Topics are using Jekyll's Collections feature. It works in the same way as blog posts except it has its own unique properties. Each file in the `_concepts` folder pertains to one topics page.

The URL is determined by the file name.

This template contains logic that results in two (2) different looks:

### Contract Award Summary Page - `/concepts/contract-award-summary`

The page can contain tabs which are specified in the topics Markdown page through this field: `tabs_required: yes`.

Tab names are created from the `title:` field.

To create a new Disqus comments section, include `disqus_identifier` which can be any unique ID of your choosing. In order for Disqus to enable a unique comments section per tab, the `url_hash` must contain `#!` before the name of the tab.

### Search Results Page - `/concepts/search-results`

This page does not contain tabs, which is specified by `tabs_required: no`.

### For Testing
Travis uses Bundler and the Rakefiles to run tests on pull requests. To emulate this environment locally, run 
`bundle install --path vendor/bundle`
