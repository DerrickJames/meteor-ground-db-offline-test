(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("ionBody"), function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        "class": Spacebars.call("bar-positive")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("ionNavBar"));
    }), "\n      ", Spacebars.include(view.lookupTemplate("ionNavView"), function() {
      return [ "\n          ", Spacebars.include(view.lookupTemplate("yield")), "\n      " ];
    }), "\n    " ];
  });
}));

Template.__checkName("new");
Template["new"] = new Template("Template.new", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "bar bar-header bar-positive"
  }, "\n    ", Blaze._TemplateWith(function() {
    return {
      path: Spacebars.call("contacts"),
      text: Spacebars.call("Back")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("ionNavBackButton"));
  }), "\n    ", HTML.Raw('<div class="title">Edit Contact</div>'), "\n  "), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        "class": Spacebars.call("padding")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("ionContent"), function() {
        return [ "\n          ", Blaze._TemplateWith(function() {
          return {
            schema: Spacebars.call("ContactsSchema"),
            collection: Spacebars.call("Contacts"),
            id: Spacebars.call("insertContactForm"),
            type: Spacebars.call("normal"),
            omitFields: Spacebars.call("createdAt, lastUpdated")
          };
        }, function() {
          return Spacebars.include(view.lookupTemplate("quickForm"));
        }), "\n      " ];
      });
    }), "\n  " ];
  }) ];
}));

Template.__checkName("edit");
Template["edit"] = new Template("Template.edit", (function() {
  var view = this;
  return [ HTML.DIV({
    "class": "bar bar-header bar-positive"
  }, "\n      ", Blaze._TemplateWith(function() {
    return {
      path: Spacebars.call("contacts"),
      text: Spacebars.call("Back")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("ionNavBackButton"));
  }), "\n      ", HTML.Raw('<div class="title">Edit Contact</div>'), "\n    "), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n      ", Blaze._TemplateWith(function() {
      return {
        "class": Spacebars.call("padding")
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("ionContent"), function() {
        return [ "\n        ", Blaze.If(function() {
          return Spacebars.call(view.templateInstance().subscriptionsReady());
        }, function() {
          return [ "\n          ", Blaze._TemplateWith(function() {
            return {
              schema: Spacebars.call("ContactsSchema"),
              collection: Spacebars.call("Contacts"),
              id: Spacebars.call("editContactForm"),
              type: Spacebars.call("normal"),
              doc: Spacebars.call(view.lookup("selectedDoc")),
              omitFields: Spacebars.call("createdAt, lastUpdated")
            };
          }, function() {
            return Spacebars.include(view.lookupTemplate("quickForm"));
          }), "\n        " ];
        }, function() {
          return [ "\n          ", Spacebars.include(view.lookupTemplate("spinner")), "\n        " ];
        }), "\n      " ];
      });
    }), "\n  " ];
  }) ];
}));

Template.__checkName("contacts");
Template["contacts"] = new Template("Template.contacts", (function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return "headerTitle";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.H1({
        "class": "title"
      }, "Contacts"), "\n  " ];
    });
  }), "\n\n  ", Blaze._TemplateWith(function() {
    return "headerButtonRight";
  }, function() {
    return Spacebars.include(view.lookupTemplate("contentFor"), function() {
      return [ "\n    ", HTML.A({
        href: function() {
          return Spacebars.mustache(view.lookup("pathFor"), "new");
        },
        "class": "button button-clear"
      }, Blaze._TemplateWith(function() {
        return {
          icon: Spacebars.call("ios-plus-empty")
        };
      }, function() {
        return Spacebars.include(view.lookupTemplate("ionIcon"));
      })), "\n  " ];
    });
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("ionView"), function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("ionContent"), function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(view.templateInstance().subscriptionsReady());
      }, function() {
        return [ "\n            ", Spacebars.include(view.lookupTemplate("ionList"), function() {
          return [ "\n             ", Blaze.Each(function() {
            return Spacebars.call(view.lookup("contacts"));
          }, function() {
            return [ "\n               ", Blaze._TemplateWith(function() {
              return {
                path: Spacebars.call("edit"),
                buttonRight: Spacebars.call(true)
              };
            }, function() {
              return Spacebars.include(view.lookupTemplate("ionItem"), function() {
                return [ "\n                  ", HTML.H2(Blaze.View("lookup:name", function() {
                  return Spacebars.mustache(view.lookup("name"));
                })), "\n                  ", HTML.P(Blaze.View("lookup:email", function() {
                  return Spacebars.mustache(view.lookup("email"));
                })), "\n                  ", HTML.BUTTON({
                  "class": "button button-assertive"
                }, "\n                    ", Blaze._TemplateWith(function() {
                  return {
                    icon: Spacebars.call("close-circled")
                  };
                }, function() {
                  return Spacebars.include(view.lookupTemplate("ionIcon"));
                }), "\n                  "), "\n               " ];
              });
            }), "\n             " ];
          }), "\n            " ];
        }), "\n         " ];
      }, function() {
        return [ "\n          ", Spacebars.include(view.lookupTemplate("spinner")), "\n         " ];
      }), "\n      " ];
    }), "\n  " ];
  }) ];
}));

}).call(this);
