# PS311ServiceRequest

This package contains a component to collect 311 service request details. It mimics the [San Diego "Get It Done"](https://www.sandiego.gov/get-it-done) interface. Contains 4 primary screens to collect and submit service request information:
* <b>Issue Details</b> - primary screen to capture issue details; address location, issue type/sub-type, description, and image
* <b>Follow Up</b> - the contact details; either anonymous or capture individual contact details
* <b>Verify</b> - a verification screen of information about to be submited
* <b>Confirmation</b> - screen confirming submission of service case with link to new case record

<b>Dependency:</b> Install the [PSCommon](https://github.com/thedges/PSCommon) package first

![alt text](https://github.com/thedges/PS311ServiceRequest/blob/master/311-community.png "Sample Image")

* The component configuration fields are:
  - <b>Auto Center</b> - a flag to set whether the map auto-centers on current GPS location or use the default lat/lng below
  - <b>Map Center Latitude</b> - the default latitude value for centering the map
  - <b>Map Center Latitude</b> - the default longitude value for centering the map
  - <b>Map Zoom Level</b> - the default map zoom level; default: 11
  - <b>Full Address Field</b> - the field API name for storing the full address string (street, city, state, postal)
  - <b>Street Field</b> - the field API name for storing the street
  - <b>City Field</b> - the field API name for storing the city
  - <b>State Field</b> - the field API name for storing the state
  - <b>Zipcode Field</b> - the field API name for storing the zipcode/postal code
  
<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>
