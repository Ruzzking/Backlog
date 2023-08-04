public class Backlog {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases() {
        return [
            SELECT CaseNumber, Id, Subject, contact.name, account.name, reason, Departure_Date__c, Is_VIP__c
            FROM Case
       ];
    }
}