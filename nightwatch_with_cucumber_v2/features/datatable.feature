Feature: Datatable 

Scenario: Verifying data 

  Given I open "https://datatables.net/" page
  And on the first page of the table, "Ashton Cox" age is "66"
  And on the first page of the table, sum ages of "Software Engineer" is "107"
  And on the first page of the table, the person who started on "2012/12/02" has salary "372,000"
  And there is no data for column Name "Cara"
  And calculate and average age for all persons in table