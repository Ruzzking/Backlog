import { LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/Backlog.getCases';


export default class BacklogCases extends LightningElement {

  records = [];
  filteredRecords = [];

  accountFilters = [];
  contactFilters = [];
  skillsFilters = [];

  @wire(getCases)
  wiredCases({ error, data }) {
    if (data) {
      this.records = data;
      this.filteredRecords = data;

      this.accountFilters = [{ label: null, name: null }];
      this.contactFilters = [{ label: null, name: null }];
      this.skillsFilters = [{ label: null, name: null }];

      data.forEach((record, idx) => {
        debugger;
        let existsAccount = this.accountFilters.find((af) => af.value == record.Account.Name)
        let existsContact = this.contactFilters.find((af) => af.value == record.Contact.Name)
        // let existsSkills = this.skillsFilters.find((af) => af.name == record.Skills.Name)

        if (!existsAccount) {

          this.accountFilters.push({
            label: record.Account.Name,
            value: record.Account.Name
          })
        }
        if (!existsContact) {

          this.contactFilters.push({
            label: record.Contact.Name,
            value: record.Contact.Name
          })
        }

      });

    } else if (error) {
      console.log(error);
    }
  }




  // records = [
  //     {
  //         caseNumber: "00001103",
  //         account: "ABC Co.",
  //         contact: "James Jones",
  //         isVip: true,
  //         subject: "Trip to London",
  //         skills: "VIP, SC_abc_co",
  //         departureDate: "17 Jul 2023",
  //         waitTime: "3 h 15 min",
  //         casePriority: "CRITICAL",
  //         sla: "VIOLATED",
  //         reason: "New Booking"
  //     },
  //     {
  //         caseNumber: "00001121",
  //         account: "ABC Co. US",
  //         contact: "Theresa Webb",
  //         isVip: false,
  //         subject: "Trip to BL",
  //         skills: "SC_abc_co_us",
  //         departureDate: "",
  //         waitTime: "1 h 32 min",
  //         casePriority: "URGENT",
  //         sla: "27 min",
  //         reason: "Change (and cancellation)"
  //     },
  //     {
  //         caseNumber: "00001098",
  //         account: "ABC Co.",
  //         contact: "James Jones",
  //         isVip: true,
  //         subject: "New Enquiry",
  //         skills: "VIP, SC_abc_co",
  //         departureDate: "23 Sep 2023",
  //         waitTime: "1 h 27 min",
  //         casePriority: "HIGH",
  //         sla: "42 min",
  //         reason: "New Booking"
  //     },


  // ];
  filteredRecords = this.records;


  columns = [
    "CASE NUMBER",
    "ACCOUNT",
    "CONTACT",
    "IS VIP",
    "SUBJECT",
    "SKILLS",
    "DEPARTURE DATE",
    "WAIT TIME",
    "CASE PRIORITY",
    "SLA",
  ];

  filterContact = (event) => {
    this.filteredRecords =[];
    for (let x = 0; x < this.records.length; x++) {
      if(this.records[x].Contact.Name == event.target.value)
      this.filteredRecords.push(this.records[x]);
    }
  }

  filterAccount = (event) => {
    this.filteredRecords = [];
    for (let x = 0; x < this.records.length; x++) {
      if (this.records[x].Account.Name == event.target.value)
        this.filteredRecords.push(this.records[x]);
    }
  }

  filterRecords = (event) => {

    let string = event.target.value
    this.filteredRecords = [];
    for (let x = 0; x < this.records.length; x++) {

      if (this.records[x].Subject.toLowerCase().startsWith(string.toLowerCase())) {
        this.filteredRecords.push(this.records[x]);
      }
      else if (this.records[x].CaseNumber.startsWith(string)) {
        this.filteredRecords.push(this.records[x]);
      }
    }
  }
}