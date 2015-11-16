var Widgets = {
    string: {
        template: '<input type="text" class="form-control" placeholder="Condition name" aria-describedby="basic-addon1" value="<%= value %>">',
        render: function () {
            //alert (this.template);
        }
    },
    boolean: {
        template: "",
        render: function () {
            
        }
    },
    number: {
        template: "",
        render: function () {
            
        }
    },
    reference: {
        template: "",
        render: function () {
            
        }
    },
    ConditionalAttributesSet: {
        template: '<select class="combobox"><option></option><option value="PA">Pennsylvania</option><option value="CT">Connecticut</option></select>',
        render: function () {
            $('.combobox').combobox();
        }
    }
};