---
title: API

archived_page: no
archived_page_text:
link_to_archived_designs:
link_to_active_designs:

category: "Developer Tools:"

headline: API

copy:
  - text: <a class="usa-cta external-link" href="http://ec2-52-222-21-220.us-gov-west-1.compute.amazonaws.com:8000/api/v1/awards/summary/ " target="_blank">Access the Alpha Outbound API</a>
  - text: <strong> What is an API?</strong>
  - text: An API (Application Programming Interface) is code that allows software to communicate over the internet. The DATA Act implementation team has published an open API as part of the future USAspending.gov platform. The DATA Act Outbound API is built as a RESTful (Representational State Transfer) interface to allow interaction with the cloud-based environment that hosts USAspending.gov data.
  - text: <strong>How does the API work?</strong>
  - text: The DATA Act Outbound API is designed to transfer requests in flexible pieces that users can control in order to retrieve specific data. Through a series of API endpoints, users can call for a portion of the data related to a field as specific as a single Unique Record Identifier (URI), or as broad as an account that meets defined criteria. The outbound API gives developers and other users a powerful tool to connect with the data that they need.
  - text: <strong>Getting started</strong>
  - text: |
      The DATA Act Outbound allows users to interact with several sample endpoints. Clicking on an endpoint opens a window with multiple sections:
      <ul>
        <li>Implementation Notes: Context for the purpose of the endpoint</li>
        <li>Response Class: Shows the operation in both human-readable (“Model”) and machine-readable (“Example Value”) format</li>
        <li>Parameters: Allows users to interact with the value field for the endpoint. For POST calls, the “Data Type” field will also display an example query – click this text to automatically import it into the value field. For GET calls, users must manually fill out the value field.</li>
        <li>Response Messages: Error messages that may be returned in the event of an issue</li>
        <li>Try it Out!: Calls the API once a value has been entered and returns a response</li>
      </ul>
  - text: <strong>Current Version</strong>
  - text: The current version of the outbound API is built on Swagger, an ecosystem of tools aligned to a formal specification describing REST APIs in both human- and machine-readable formats. At the current stage of API development, the Swagger platform supports rapid and iterative prototyping of the outbound API to best fit users' needs and provide a working example of functionality for review. The initial publication of the DATA Act Outbound API is scheduled for the end of August 2016, and will be completed in October of 2016.
  - text: <strong>Data Schema</strong>
  - text: The backbone of the data is the DATA Act Information Model Schema v1.0 (Schema), which provides technical specifications for the federal financial and award data on USAspending.gov. The DATA Act Outbound API is aligned with the Schema. For more information on the Schema, as well as diagrams, information flow context, and the online data dictionary, please visit <a class="usa-cta external-link" href="http://fedspendingtransparency.github.io/data-model/" target="_blank">here</a>

tabs_required: yes

tabs:
  - title: Version 0.1A
    url_hash: "!version-0.1A"
    archived_text:
    disclaimer_text: <a class="usa-cta external-link" href="http://ec2-52-222-21-220.us-gov-west-1.compute.amazonaws.com/v1/ui/" target="_blank">Access the Alpha Outbound API</a>
    image: "/assets/img/concepts_api.png"
    image_alt_text: An image of the page on Swagger to try out the API.
    disqus_identifier: 06193088
    disqus_url: "https://openbeta.usaspending.com/concepts/api#!version-0.1A"

no_tabs:
  - archived_text:
    description:
    features:
      - description:
    disclaimer_text:
    image:
    image_alt_text:
    below_image_content:
    disqus_identifier:
    disqus_url:

---
