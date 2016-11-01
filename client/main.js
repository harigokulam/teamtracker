import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {Util} from '/lib/utils.js';
import './main.html';
import './util.html';

Template.login.onCreated(function () {
    console.log('login');
});

Template.menu_authenticated.helpers({
    alert:function() {
        
    }
});

Template.menu_authenticated.events({
  
});

Template.team.onCreated(function(){
    this.sortColumn = new ReactiveVar('empId');
});

Template.team.helpers({
   employees: function() {
       var sortOn = Template.instance().sortColumn.get();
       return Employees.find({}, {sort: {empId: 1}});
   } 
});


Template.team.events({
    'click .js-team-title': function(event, template) {
        console.log($(event.target).data('field'));
        template.sortColumn.set($(event.target).data('field'));
       // Session.set("teamSortColumn", $(event.target).data('field'));
    }
})

Template.csvToJson.events({
    'click .js-csv-to-json':function(event){
        console.log('Click');
        var res = Util.csvToJson($('#sourceCsv').val());

        $('#resultJson').val(res);
        
        return false;
    },
    
    'click .js-save-to-db':function(event){
      
        var res = JSON.parse($('#resultJson').val());
       // Employees.remove({});
        
        for(var i = 0; i<res.length; i++) {
            var rec = res[i];
            
            var proj = Projects.findOne({id:rec.ProjectID});
            if (proj == undefined) {
                Projects.insert({
                    id : rec.ProjectID,
                    title: rec.ProjectDescription,
                    pm: rec.PMName,
                    dm: rec.DeliveryManagerName,
                    customer: rec.CustomerName
                
                });
            }
            
            var emp = Employees.findOne({empId: rec.EmployeeID});
            
            if (emp == undefined) {
                Employees.insert({
                    empId:rec.EmployeeID, 
                    name:rec.EmployeeName, 
                    location:rec.BaseLocation, 
                    grade:rec.Grade,
                    projectId: rec.ProjectID,
                    joinedOn: rec.DateOfJoining,
                    active: true

                });
            }
      /*
        for a resource and a project, if there is an entry check the start date and end
        
        Add a sequence number for easy tracking
        
        dates should be stored as date or in yyyymmdd format to sort on dates
      */
            Allocations.insert({
               resource: rec.EmployeeID,
                project: rec.ProjectID,
                start: rec.AllocStartDt,
                end: rec.AllocEndDt
            });
        }
 //
//
        return false;
    }
});

/*<!--Projects -->*/
Template.projectlist.helpers({
   projects: function() {
       return Projects.find({}, {sort: {customer: 1}});
   } 
});

Template.tasks.onCreated(function(){
    
});
Template.tasks.helpers({
    tasks: function() {
       
       return Tasks.find({active: true}, {sort: {dueOn: 1}});
   } 
});
Template.tasks.events({
    'click .js-task-status' :function(e) {
        e.preventDefault();
        var id = e.target.value;
        Tasks.update({_id:id}, {active: false})
    }
    
});
Template.newTask.events({
    'submit .js-task-form': function(e) {
        e.preventDefault();
        console.log('Add Task');
        var tgt = e.target;
        Tasks.insert({
           title:  tgt.title.value,
            type: tgt.type.value,
            dueOn: tgt.dueOn.value,
            createdOn: new Date(),
            active: true
        });
        
        return false;
    }
});

Template.newTask.helpers({
    
}) ;