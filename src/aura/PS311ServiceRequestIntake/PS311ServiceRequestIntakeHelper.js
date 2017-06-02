({
  reverseGeocodeEsri: function(component, lat, lng) {

    var action = component.get("c.reverseGeocodeEsri");
    action.setParams({
      "lat": lat,
      "lng": lng
    });

    action.setCallback(self, function(a) {
      console.log(a.getReturnValue());
      var resp = JSON.parse(a.getReturnValue());

      if (resp.hasOwnProperty('error')) {
        component.set('v.address', resp.error.details[0]);
      } else {
        component.set('v.address', resp.address.Match_addr);
        //component.set('v.accStreet', resp.address.Address);
        //component.set('v.accCity', resp.address.City);
        //component.set('v.accState', resp.address.Region);
        //component.set('v.accPostal', resp.address.Postal);
      }
    });
    // Enqueue the action
    //$A.enqueueAction(action);
    $A.clientService.runActions([action], this, function() {});
  },
  getTypes: function(component) {
    var action = component.get("c.getTypeOptions");

    var self = this;
    action.setCallback(this, function(actionResult) {
      component.set("v.typeList", actionResult.getReturnValue());
    });
    $A.enqueueAction(action);
  },
  getSubTypes: function(component, type) {
    var action = component.get("c.getSubTypeOptions");
    action.setParams({
      "type": type,
    });

    var self = this;
    action.setCallback(this, function(actionResult) {
      component.set("v.subtypeList", actionResult.getReturnValue());
    });
    $A.enqueueAction(action);
  },
  saveCase: function(component) {
    var self = this;
    var map = {};

    map['userId'] = component.get('v.userId');
    map['contactId'] = component.get('v.contactId');

    map['latitude'] = component.get('v.latitude');
    map['longitude'] = component.get('v.longitude');
    map['address'] = component.get('v.address');
    map['description'] = component.get('v.description');
    map['type'] = component.get('v.type');
    map['subtype'] = component.get('v.subtype');

    map['anonymousFlag'] = component.get('v.anonymousFlag');
    map['firstName'] = component.get('v.firstName');
    map['lastName'] = component.get('v.lastName');
    map['email'] = component.get('v.email');
    map['phone'] = component.get('v.phone');

    console.log('paramMap=' + JSON.stringify(map));

    var action = component.get("c.saveCase");
    action.setParams({
      "params": JSON.stringify(map)
    });

    action.setCallback(self, function(a) {
      console.log(a.getReturnValue());
      var resp = JSON.parse(a.getReturnValue());

      if (resp.status == 'SUCCESS') {
        component.set('v.parentId', resp.data.Id);
        self.fireSaveFileEvent(component);
      } else {
        component.set("v.Spinner", false);

        self.showConfirm(component, "action:close", resp.msg);
      }

    });
    // Enqueue the action
    $A.enqueueAction(action);

  },
  getUserInfo: function(component) {
    console.log('getUserInfo called...');

    var action = component.get("c.getUserInfo");

    action.setCallback(self, function(a) {
      console.log(a.getReturnValue());
      var resp = JSON.parse(a.getReturnValue());
      console.log('resp=' + JSON.stringify(resp));

      if (resp.status == 'SUCCESS') {

        component.set('v.userId', resp.data.UserId);
        component.set('v.contactId', resp.data.ContactId);

        component.set('v.firstName', resp.data.FirstName);
        component.set('v.lastName', resp.data.LastName);
        component.set('v.email', resp.data.Email);
        component.set('v.phone', resp.data.Phone);
      }

    });
    // Enqueue the action
    $A.enqueueAction(action);

  },
  fireSaveFileEvent: function(component) {
    console.log('ImageUpload::fireSaveFileEvent invoked...');
    var appEvent = $A.get("e.c:ImageUploadSaveEvent_fk");
    appEvent.fire();
  },
  showConfirm: function(component, iconToShow, msg) {
    $A.createComponent(
      "lightning:icon", {
        "aura:id": "resultsIcon",
        "iconName": iconToShow,
        "size": "medium"
      },
      function(newIcon, st, errorMessage) {
        if (st === "SUCCESS") {
          var body = component.get("v.body");
          body.push(newIcon);
          component.set("v.body", body);

          component.set("v.saveResult", msg);
        } else if (status === "INCOMPLETE") {
          console.log("No reponse from server");
        } else if (status === "ERROR") {
          component.set("v.saveResult", "ERROR: " + msg);
          console.log("Error: " + errorMessage);
        }
      }
    );
  }
})