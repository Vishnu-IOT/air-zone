// Editable site content. List only brands the business actually services; this is not an official-partner claim.
export const brands=['Mercedes-Benz','BMW','Audi','Porsche','Lexus','Jaguar','Land Rover','Volvo','Volkswagen','MINI'].map(name=>({name,logo:''})); // set logo:'/images/brands/<file>.svg' once the official asset is supplied
// published:false records are NEVER shown. Add genuine, approved reviews with published:true.
export const reviews=[{id:1,published:false,name:'Customer name',service:'',date:'',text:'Customer review to be added after verification.'}];
export const homeFaqs=[['How do I book an appointment?','Send a quote request with your vehicle and service details. The team will follow up to discuss next steps.'],
['Will I get an estimate first?','Estimates are provided after assessment, and additional work is discussed with you before proceeding.'],
['What does computer diagnostics involve?','Scanning the vehicle’s modules for fault codes, reviewing live data and testing to confirm the cause.'],
['Why is AC repair priced differently for each car?','Components, refrigerant and procedures differ by make and model, so cost depends on the vehicle and findings.'],
['Is pricing the same for every vehicle?','No. Luxury and premium vehicles can need different parts, fluids and labour.']];
export const whyPoints=[['Structured inspection','Each vehicle is checked against a clear list, not a quick glance.'],['Clear explanations','Findings are explained in plain language.'],['Condition-based advice','Recommendations follow your vehicle’s actual condition.'],['Approval first','Extra work is discussed with you before it proceeds.'],['Vehicle-specific care','Specifications differ by make and model, and we treat them that way.']];
