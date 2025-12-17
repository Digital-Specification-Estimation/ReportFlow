import type { TOCSection } from '@/types';

// Professional Real Property Appraisal Template - Based on Acorn Appraisals format
export const appraisalSections: TOCSection[] = [
  // Cover Page
  {
    id: 'cover-page',
    title: 'Cover Page',
    slug: 'cover-page',
    level: 1,
    order: 0,
    content: `
      <div class="cover-page" style="
        text-align: center; 
        padding: 50px 30px; 
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
        background: linear-gradient(135deg, #fafbff 0%, #f0f4ff 50%, #ffffff 100%); 
        min-height: 100vh; 
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        position: relative;
        overflow: hidden;
      ">
        <!-- Decorative Background Elements -->
        <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 197, 253, 0.1)); border-radius: 50%; z-index: 0;"></div>
        <div style="position: absolute; bottom: -100px; left: -100px; width: 300px; height: 300px; background: linear-gradient(45deg, rgba(59, 130, 246, 0.03), rgba(147, 197, 253, 0.08)); border-radius: 50%; z-index: 0;"></div>
        
        <div style="position: relative; z-index: 1;">
          <!-- Company Header -->
          <div style="
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%); 
            color: white; 
            padding: 35px 40px; 
            border-radius: 16px; 
            margin-bottom: 60px; 
            box-shadow: 0 25px 50px rgba(30, 64, 175, 0.25);
            position: relative;
            overflow: hidden;
          ">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <h1 style="
                font-size: 2.2rem; 
                margin: 0; 
                font-weight: 600; 
                font-family: 'Inter', sans-serif; 
                letter-spacing: 1px; 
                line-height: 1.1;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
              ">ACORN APPRAISALS</h1>
              <h2 style="
                font-size: 1.4rem; 
                margin: 6px 0 0 0; 
                font-weight: 400; 
                font-family: 'Inter', sans-serif; 
                letter-spacing: 0.5px;
                opacity: 0.95;
              ">& Valuation Services Inc.</h2>
              <div style="width: 80px; height: 1px; background: rgba(255,255,255,0.7); margin: 20px auto;"></div>
              <p style="
                margin: 15px 0 0 0; 
                font-size: 0.85rem; 
                opacity: 0.9; 
                letter-spacing: 2px; 
                font-weight: 500;
                text-transform: uppercase;
              ">Knowledge • Experience • Integrity</p>
            </div>
          </div>
          
          <!-- Report Title -->
          <div style="margin: 0 0 50px 0;">
            <h1 style="
              font-size: 2rem; 
              font-weight: 500; 
              color: #1f2937; 
              margin: 0 0 15px 0; 
              letter-spacing: 1px; 
              font-family: 'Inter', sans-serif;
              line-height: 1.2;
            ">Appraisal of Real Property</h1>
            <div style="width: 100px; height: 2px; background: linear-gradient(90deg, #3b82f6, #60a5fa); margin: 0 auto; border-radius: 1px;"></div>
          </div>
        </div>
        
        <!-- Main Content Area -->
        <div style="position: relative; z-index: 1; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 40px;">
          
          <!-- Property Information Card -->
          <div style="
            background: rgba(255, 255, 255, 0.9); 
            backdrop-filter: blur(10px);
            padding: 35px; 
            border-radius: 20px; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.08); 
            border: 1px solid rgba(255,255,255,0.2);
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          ">
            <h3 style="
              font-size: 1.1rem; 
              font-weight: 600; 
              color: #3b82f6; 
              margin: 0 0 20px 0; 
              font-family: 'Inter', sans-serif;
              text-transform: uppercase;
              letter-spacing: 1px;
            ">Subject Property</h3>
            <div style="text-align: left;">
              <p style="font-size: 1.3rem; font-weight: 600; color: #1f2937; margin: 0 0 8px 0; font-family: 'Inter', sans-serif;">Jocelyn Michaud</p>
              <p style="font-size: 1.1rem; color: #6b7280; margin: 0 0 4px 0; font-weight: 400;">10 Lindsay Street</p>
              <p style="font-size: 1.1rem; color: #6b7280; margin: 0; font-weight: 400;">Bathurst, E2A 7J8, New Brunswick</p>
            </div>
          </div>
          
          <!-- Property Image -->
          <div style="margin: 0;">
            <div style="
              max-width: 550px; 
              margin: 0 auto; 
              border-radius: 20px; 
              overflow: hidden; 
              box-shadow: 0 20px 60px rgba(0,0,0,0.15); 
              border: 6px solid rgba(255,255,255,0.8);
              backdrop-filter: blur(10px);
            ">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" alt="Subject Property" style="width: 100%; height: auto; display: block;" />
            </div>
          </div>
          
          <!-- Date and Client Info Row -->
          <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; max-width: 800px; margin: 0 auto;">
            
            <!-- Appraisal Date -->
            <div style="
              background: rgba(248, 250, 252, 0.8); 
              backdrop-filter: blur(10px);
              padding: 25px 30px; 
              border-radius: 16px; 
              border-left: 4px solid #3b82f6;
              box-shadow: 0 8px 25px rgba(0,0,0,0.06);
              flex: 1;
              min-width: 250px;
            ">
              <p style="
                font-size: 0.9rem; 
                color: #6b7280; 
                margin: 0 0 8px 0; 
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
              ">Effective Date</p>
              <p style="font-size: 1.2rem; color: #1f2937; margin: 0; font-weight: 600;">November 06, 2025</p>
            </div>
            
            <!-- Client Information -->
            <div style="
              background: rgba(255, 255, 255, 0.9); 
              backdrop-filter: blur(10px);
              padding: 25px 30px; 
              border-radius: 16px; 
              box-shadow: 0 8px 25px rgba(0,0,0,0.08); 
              border: 1px solid rgba(255,255,255,0.3);
              flex: 1;
              min-width: 250px;
            ">
              <p style="
                font-size: 0.9rem; 
                color: #6b7280; 
                margin: 0 0 12px 0; 
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
              ">Prepared For</p>
              <p style="font-size: 1.2rem; font-weight: 700; color: #1f2937; margin: 0 0 6px 0;">769015 NB Inc.</p>
              <p style="font-size: 0.95rem; color: #6b7280; margin: 0; line-height: 1.5;">23 David Court<br>Dieppe, NB E1A 0J7</p>
            </div>
          </div>
        </div>
        
        <!-- Footer - Appraiser Information -->
        <div style="
          position: relative; 
          z-index: 1; 
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%); 
          backdrop-filter: blur(15px);
          border: 1px solid rgba(59, 130, 246, 0.2); 
          padding: 30px; 
          border-radius: 20px; 
          max-width: 600px; 
          margin: 40px auto 0 auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        ">
          <p style="
            font-size: 0.85rem; 
            color: #6b7280; 
            margin: 0 0 15px 0; 
            font-weight: 600; 
            text-transform: uppercase; 
            letter-spacing: 1px;
          ">Prepared By</p>
          <p style="
            font-size: 1.3rem; 
            font-weight: 700; 
            color: #1f2937; 
            margin: 0 0 12px 0;
            font-family: 'Inter', sans-serif;
          ">Acorn Appraisals and Valuation Services Inc.</p>
          <div style="font-size: 1rem; color: #6b7280; line-height: 1.6; font-weight: 400;">
            <p style="margin: 0;">795 Main Street, Suite #300</p>
            <p style="margin: 0;">Moncton, New Brunswick, E1C 1E9</p>
            <p style="margin: 0;">Canada</p>
          </div>
        </div>
      </div>
    `,
  },
  
  // 1.0 ASSUMPTIONS AND LIMITING CONDITIONS
  {
    id: 'sec-1',
    title: '1.0 Assumptions and Limiting Conditions',
    slug: 'assumptions-limiting-conditions',
    level: 1,
    order: 1,
    content: `
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); padding: 40px; border-radius: 16px; margin-bottom: 30px;">
        <h1 style="color: #1e40af; font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 30px; font-family: 'Inter', sans-serif;">1.0 ASSUMPTIONS AND LIMITING CONDITIONS</h1>
        
        <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); border-left: 4px solid #3b82f6;">
          <p style="font-size: 1.1rem; color: #374151; margin-bottom: 25px; font-weight: 500;">"Appraisal" means the reported opinion of value stated herein to which these Assumptions and Limiting Conditions are attached.</p>
          
          <p style="font-size: 1.1rem; color: #374151; margin-bottom: 25px;">"Property" means the subject of the Appraisal.</p>
          
          <p style="font-size: 1.1rem; color: #374151; margin-bottom: 25px;">"Appraiser(s)" means the employee(s) of <em>Acorn Appraisals and Valuation Services Inc.</em> who prepared and signed the Appraisal.</p>
          
          <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 25px 0;">
            <p style="font-size: 1rem; color: #0c4a6e; margin: 0; line-height: 1.7;">The certification that appears in this report is subject to compliance with the Personal Information and Electronics Documents Act (PIPEDA), Canadian Uniform Standards of Professional Appraisal Practice (CUSPAP) and the following conditions:</p>
          </div>
          
          <div style="margin-top: 30px;">
            <ol style="color: #374151; line-height: 1.8; font-size: 1rem; padding-left: 20px;">
              <li style="margin-bottom: 15px;">This report is prepared only for the authorized client and authorized users specifically identified in this report and only for the specific use identified herein. No other person may rely on this report or any portion thereof, and the client may not distribute this report to any other person without the express written consent of the authors. Liability is expressly denied to any other person and, accordingly, no responsibility is accepted for any damage or loss incurred by any other person as a result of reliance in whole or in part based on this report. Liability is expressly denied for any unauthorized user or for anyone who uses this report for any use not specifically identified in this report. Purpose of the report does not affect its liability. Reliance on this report without authorization or for an unauthorized use is unreasonable.</li>
              
              <li style="margin-bottom: 15px;">Because market conditions, including economic, social and political factors, may change rapidly and, on occasion, without warning, this report cannot be relied upon as of any date other than the effective date specified in this report unless specifically authorized by the author(s).</li>
              
              <li style="margin-bottom: 15px;">The author will not be responsible for matters of a legal nature that affect either the property being appraised or the title to it. The property is appraised on the basis of it being under responsible ownership, the registry office search has been performed and the subject property is free and clear of all encumbrances except as noted in the report. The author assumes no responsibility for any lien not shown by the registry office search and assumes no responsibility for any encumbrance or for ascertaining whether any improvements made to the property may be subject to a claim by any person who supplied materials or services in respect of such improvements. Any person requiring legal advice is recommended to obtain the services of a competent solicitor rather than to rely on the author in such matters.</li>
              
              <li style="margin-bottom: 15px;">Verification of compliance with government regulations, bylaws or statutes is outside the scope of the work performed in completing this appraisal. This report is completed for valuation purposes only and any reliance is unreasonable. Any information provided by the appraiser does not negate the need to retain an appropriately qualified professional to determine government regulation compliance.</li>
              
              <li style="margin-bottom: 15px;">No opinion is intended to be expressed for matters that require specialized investigation or knowledge and is included only to assist the reader of this report in visualizing the property. It is unreasonable to rely on this report as an alternative to a survey, and an accredited surveyor ought to be retained for such matters.</li>
            </ol>
          </div>
        </div>
      </div>
    `,
  },
  
  // 2.0 INTRODUCTION
  {
    id: 'sec-2',
    title: '2.0 Introduction',
    slug: 'introduction',
    level: 1,
    order: 2,
    content: `
      <h2 style="text-align: center; font-weight: 600; margin-bottom: 30px;">Summary of Salient Facts and Conclusions</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 40%;"><strong>Authorized Client:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;"><strong>769015 NB Inc.</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Property Owner:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Jocelyn Michaud</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Location:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;">10 Lindsay Street<br>Bathurst, E2A 7J8, NB</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Property Identification:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;">PID 20529146</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Interest Appraised:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;">Fee Simple/Leased Fee Estate</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Existing Use:</strong></td>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Apartment Building</strong></td>
        </tr>
      </table>
      
      <p style="margin-bottom: 10px;"><strong>Highest and Best Use</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; margin-left: 20px;">
        <tr>
          <td style="padding: 5px 0; width: 30%;">As If Vacant:</td>
          <td style="padding: 5px 0;"><strong>Holding for future development into apartments</strong></td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">As Improved:</td>
          <td style="padding: 5px 0;"><strong>Continued use as apartment</strong></td>
        </tr>
      </table>
      
      <p style="margin-bottom: 10px;"><strong>Indicated Market Value</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; margin-left: 20px;">
        <tr>
          <td style="padding: 5px 0; width: 40%;">Cost Approach:</td>
          <td style="padding: 5px 0;"><strong>N/A</strong></td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">Income Approach:</td>
          <td style="padding: 5px 0;"><strong>$865,000</strong></td>
        </tr>
        <tr>
          <td style="padding: 5px 0;">Direct Comparison Approach:</td>
          <td style="padding: 5px 0;"><strong>$810,000</strong></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; border-top: 1px solid #ccc; padding-top: 10px;"><strong>Estimated Market Value:</strong></td>
          <td style="padding: 5px 0; border-top: 1px solid #ccc; padding-top: 10px;"><strong style="font-size: 1.2em;">$851,000</strong></td>
        </tr>
      </table>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; width: 40%;"><strong>Estimated Exposure Time:</strong></td>
          <td style="padding: 8px 0;"><strong>Three months</strong></td>
        </tr>
      </table>
    `,
    children: [
      { 
        id: 'sec-2-1', 
        title: '2.1 Identification of Property', 
        slug: 'identification-of-property', 
        level: 2, 
        order: 0, 
        parentId: 'sec-2', 
        content: `
          <p>The subject property is identified by civic addresses 10 Lindsay Street, City of Bathurst, NB and by Service New Brunswick Land Registry as Property Identification Numbers (PID) 20029146 and Property Account Numbers (PAN) 2864620.</p>
          <p style="background-color: #ffff00; padding: 5px;">The property is also identified as Lot xLotx on Land Registry Plan xPlanx (XCountyofPropertyx County).</p>
        ` 
      },
      { 
        id: 'sec-2-2', 
        title: '2.2 Authorized Client/Authorized User', 
        slug: 'authorized-client', 
        level: 2, 
        order: 1, 
        parentId: 'sec-2', 
        content: `
          <p>This report was prepared for <strong>769015 NB Inc.</strong>, who is authorized to use the report for the specified authorized use. A reliance letter signed by the appraiser is required for any other party to rely on this report.</p>
        ` 
      },
      { 
        id: 'sec-2-3', 
        title: '2.3 Property Ownership and Recent History', 
        slug: 'property-ownership', 
        level: 2, 
        order: 2, 
        parentId: 'sec-2', 
        content: `
          <p>The current owner is <strong>Jocelyn Michaud</strong>.</p>
          <p><strong>Recent History</strong></p>
          <p>To the best of the appraiser's knowledge, the subject property has not sold in the past three years and has not been publicly listed for sale, been under agreement to sell, option to sell or lease in the past year.</p>
        ` 
      },
      { 
        id: 'sec-2-4', 
        title: '2.4 Purpose and Authorized Use', 
        slug: 'purpose-authorized-use', 
        level: 2, 
        order: 3, 
        parentId: 'sec-2', 
        content: `
          <p>The purpose of this appraisal is to estimate the current market value of the fee simple/leased fee interest in the subject property, as of <strong>November 6, 2025</strong>.</p>
          <p>The appraisal will be used as a measure of value for <u><strong>seeking first mortgage financing</strong></u>.</p>
        ` 
      },
      { 
        id: 'sec-2-5', 
        title: '2.5 Interest Appraised', 
        slug: 'interest-appraised', 
        level: 2, 
        order: 4, 
        parentId: 'sec-2', 
        content: `
          <p>The "leased fee" interest is considered instead of the "fee simple" interest, as residential leases/rental agreements are in place.</p>
        ` 
      },
      { 
        id: 'sec-2-6', 
        title: '2.6 Pertinent Definitions', 
        slug: 'pertinent-definitions', 
        level: 2, 
        order: 5, 
        parentId: 'sec-2', 
        content: `
          <p>According to the <u>Canadian Uniform Standards of Professional Appraisal Practice</u>, "market value" is defined as follows:</p>
          <blockquote style="background-color: #d4edda; padding: 15px; margin: 15px 0; border-left: 3px solid #28a745; font-style: italic;">
            <p>"The most probable price, as of a specified date, in cash, or in terms equivalent to cash, or in other precisely revealed terms, for which the specified property rights should sell after reasonable exposure in a competitive market under all conditions requisite to a fair sale, with the buyer and the seller each acting prudently, knowledgeably, and for self-interest, and assuming that neither is under undue duress."</p>
          </blockquote>
          <p><em>Source: The Appraisal of Real Estate, Fourth Canadian Edition, ed. Dybvig.</em></p>
          
          <p>According to <u>The Appraisal of Real Estate</u>, Third Canadian Edition, ed. Dybvig, (University of British Columbia, Real Estate Division, 2010), "<strong>fee simple interest</strong>" is defined as follows:</p>
          <blockquote style="background-color: #d4edda; padding: 15px; margin: 15px 0; border-left: 3px solid #28a745; font-style: italic;">
            <p>"Absolute ownership unencumbered by any other interest or estate, subject only to the limitations imposed by the governmental powers of taxation, expropriation, police power, and escheat."</p>
          </blockquote>
          
          <p>According to <u>The Appraisal of Real Estate</u>, Third Canadian Edition, ed. Dybvig, (University of British Columbia, Real Estate Division, 2010), "<strong>leased fee interest</strong>" is defined as follows:</p>
          <blockquote style="background-color: #d4edda; padding: 15px; margin: 15px 0; border-left: 3px solid #28a745; font-style: italic;">
            <p>"The ownership interest held by the lessor, which includes the right to the contract rent specified in the lease plus the reversionary right when the lease expires."</p>
          </blockquote>
          
          <p>According to the <u>Dictionary of Real Estate Appraisal, Fourth Edition</u>, "leased fee interest" is defined as follows:</p>
          <p>According to the <u>Dictionary of Real Estate Appraisal, Fourth Edition</u>, "lease" is defined as follows:</p>
          <p>According to the <u>Canadian Uniform Standards of Professional Appraisal Practice</u>, "inspection" is defined as follows:</p>
          <p>The "Law of Diminishing Marginal Utility," is defined by Microeconomics, Principles and Tools (1998), as</p>
          <blockquote style="background-color: #d4edda; padding: 15px; margin: 15px 0; border-left: 3px solid #28a745; font-style: italic;">
            <p>"An ownership interest held by a landlord with the rights of use and occupancy conveyed by others. The rights of the lessor (the leased fee owner) and the lessee..."</p>
            <p>"A written contract in which the rights to use and occupy land or structures are transferred by the owner to another for a specified period of time in return for a..."</p>
            <p>"An observation, site visit, walk through, viewing or non-invasive visual examination..."</p>
            <p>"As the consumption of a particular good increases, marginal utility decreases."</p>
          </blockquote>
          <p>Applied to real estate, this could mean that the "marginal utility" (which could be measured as value per square foot) of a property would decrease, as the size of a property increases. Put another way, the value of each additional square foot of building area would be less than the previous square foot (all else being equal).</p>
        ` 
      },
      { 
        id: 'sec-2-7', 
        title: '2.7 Effective Date', 
        slug: 'effective-date', 
        level: 2, 
        order: 6, 
        parentId: 'sec-2', 
        content: `
          <p>The effective date of this appraisal is <strong>November 6, 2025</strong>, the date that the property was inspected.</p>
        ` 
      },
      { 
        id: 'sec-2-8', 
        title: '2.8 Type of Report', 
        slug: 'type-of-report', 
        level: 2, 
        order: 7, 
        parentId: 'sec-2', 
        content: `
          <p>This appraisal report is a "concise report." The 2024 Canadian Uniform Standards of Appraisal Practice (CUSPAP) defines a concise report as follows:</p>
          <blockquote style="background-color: #d4edda; padding: 15px; margin: 15px 0; border-left: 3px solid #28a745; font-style: italic;">
            <p>"A Concise Report is a brief report in a narrative format that includes all relevant information for an assignment. The information is analyzed and explained with supporting data in the work file."</p>
          </blockquote>
        ` 
      },
      { 
        id: 'sec-2-9', 
        title: '2.9 Scope of Appraisal', 
        slug: 'scope-of-appraisal', 
        level: 2, 
        order: 8, 
        parentId: 'sec-2', 
        content: `
          <p>Vikram Singh, visited the subject property and completed an appraisal inspection, on November 6, 2025. Adam Dickinson, P.App., AACI did not visit the property, and relied on photographs and descriptions of the property gathered by Vikram Singh, and Google Street View imagery from August 2024.</p>
          <p>Note, this inspection is not the equivalent of an inspection by others such as an architect, a professional engineer, a licensed home inspector, plumber, electrician, carpenter, heating/cooling experts or other licensed trade specialists. The scope of inspection is recognized as a 'visual observation by walk through' or 'site visit'.</p>
          <p>The appraisal inspection did <u>not</u> include:</p>
          <ul>
            <li>the viewing of crawlspaces;</li>
            <li>viewing of attic spaces;</li>
            <li>removal of ceiling tiles;</li>
            <li>removal of any wallcoverings;</li>
            <li>window coverings;</li>
            <li>access to rooftops;</li>
            <li>confirmation of off-season systems as operational;</li>
            <li>removal of well caps;</li>
            <li>access to infrastructure/underground installations;</li>
            <li>removal of shrubbery against or material of any kind placed against interior/exterior walls;</li>
            <li>testing of capacity/flow/pressure rate capacities;</li>
            <li>access to central heating plant/systems and air-conditioning units;</li>
            <li>viewing of septic tanks;</li>
            <li>removal of electrical panels and or cover plates;</li>
            <li>moving of furniture and appliances to view wall or floor areas;</li>
            <li>viewing of locked or secured private areas;</li>
            <li>and viewing for termite, insect or other vermin presence or penetration.</li>
          </ul>
          <p><strong>Jocelyn Michaud</strong> was present during the inspection of the subject property and provided an overview of the condition.</p>
          <p>The inspection included a viewing of the building's interior, exterior, and the site. The roof was only viewed from the ground.</p>
          <p>Income and expenses records were provided by the purchaser. This information was reviewed in context of market data collected by the appraiser.</p>
          <p><strong>PSA</strong></p>
          <p>Information about similar property sales was obtained and reviewed. Each of the properties was viewed from the street, using Google Streetview, or in more detail, for this appraisal or previous assignments.</p>
          <p>Various municipal and provincial resources were reviewed to confirm property details.</p>
          <p>The Income Approach and Direct Comparison Approach were both employed in estimating current market value.</p>
        ` 
      },
      { 
        id: 'sec-2-10', 
        title: '2.10 Audits and Technical Investigations', 
        slug: 'audits-technical', 
        level: 2, 
        order: 9, 
        parentId: 'sec-2', 
        content: `
          <p>We did <u>not</u> complete technical investigations such as:</p>
          <ul>
            <li>Detailed inspections or engineering review of the structure, roof or mechanical systems;</li>
            <li>An environmental review of the property;</li>
            <li>A site or building survey;</li>
            <li>Investigations into the bearing qualities of the soils; or</li>
            <li>Audits of financial and legal arrangements reported by (name). Use for income approach reports.</li>
          </ul>
        ` 
      },
      { 
        id: 'sec-2-11', 
        title: '2.11 Verification of Third-Party Information', 
        slug: 'verification-third-party', 
        level: 2, 
        order: 10, 
        parentId: 'sec-2', 
        content: `
          <p>The analysis set out in this report relied on written and verbal information obtained from a variety of sources we considered reliable. Unless otherwise stated herein, we did not verify client-supplied information, which we believed to be correct. The mandate for the appraisal did not require a report prepared to the standard appropriate for court purposes or for arbitration, so we did not fully document or confirm by reference to primary sources all information herein.</p>
        ` 
      },
      { 
        id: 'sec-2-12', 
        title: '2.12 Limiting Conditions and Critical Assumptions', 
        slug: 'limiting-conditions-critical', 
        level: 2, 
        order: 11, 
        parentId: 'sec-2', 
        content: `
          <p>A list of "standard" limiting conditions and critical assumptions is in Section 1.0 of this report.</p>
          <p><u><strong>Extraordinary Assumptions/Hypothetical Conditions:</strong></u> If the appraisal is based on an extraordinary assumption ((EA) and/or a hypothetical condition (HC), they would be added here and any reference to value would be tied to Section XX. Also, when referencing the subject matter of an EA (e.g. zoning) it should be clearly indicated that the subject matter is based on the EA and tied back to Section XX.</p>
        ` 
      },
      { 
        id: 'sec-2-13', 
        title: '2.13 Appraisal History – Not Applicable', 
        slug: 'appraisal-history', 
        level: 2, 
        order: 12, 
        parentId: 'sec-2', 
        content: `
          <p>Not Applicable</p>
        ` 
      },
    ],
  },
  
  // 3.0 LOCATION AND NEIGHBOURHOOD DATA
  {
    id: 'sec-3',
    title: '3.0 Location and Neighbourhood Data',
    slug: 'location-neighbourhood',
    level: 1,
    order: 3,
    content: `
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); padding: 40px; border-radius: 16px; margin-bottom: 30px;">
        <h1 style="color: #1e40af; font-size: 2rem; font-weight: 600; text-align: center; margin-bottom: 40px; font-family: 'Inter', sans-serif;">3.0 LOCATION AND NEIGHBOURHOOD DATA</h1>
      </div>
    `,
    children: [
      { 
        id: 'sec-3-1', 
        title: '3.1 Location', 
        slug: 'location', 
        level: 2, 
        order: 0, 
        parentId: 'sec-3', 
        content: `
          <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); margin-bottom: 30px;">
            <h2 style="color: #1f2937; font-size: 1.5rem; font-weight: 600; margin-bottom: 25px; font-family: 'Inter', sans-serif;">3.1 Location</h2>
            <p style="color: #374151; font-size: 1.1rem; line-height: 1.7; margin-bottom: 20px;">The subject property is located at 10 Lindsay Street in City of Bathurst, NB. The subject is on the northern side of the street. The subject neighbourhood is in the Northern part of the city.</p>
          </div>
        ` 
      },
      { 
        id: 'sec-3-2', 
        title: '3.2 Location Maps', 
        slug: 'location-maps', 
        level: 2, 
        order: 1, 
        parentId: 'sec-3', 
        content: `
          <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); margin-bottom: 30px;">
            <h2 style="color: #1f2937; font-size: 1.5rem; font-weight: 600; margin-bottom: 25px; font-family: 'Inter', sans-serif;">3.2 Location Maps</h2>
            <p style="color: #374151; font-size: 1.1rem; line-height: 1.7; margin-bottom: 30px;">Maps are included below to show the approximate location of the subject.</p>
            
            <!-- Google Maps - Street View -->
            <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.123456789!2d-65.6536!3d47.6176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b8b8b8b8b8b8%3A0x1234567890abcdef!2s10%20Lindsay%20St%2C%20Bathurst%2C%20NB%20E2A%207J8%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                  width="100%" 
                  height="300" 
                  style="border:0; border-radius: 8px;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                <div style="padding: 15px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white;">
                  <p style="margin: 0; font-weight: 600; text-align: center;">Street Level Map - 10 Lindsay Street, Bathurst</p>
                </div>
              </div>
            </div>
            
            <!-- Google Maps - Satellite View -->
            <div style="background: #f0f9ff; border-radius: 12px; padding: 20px;">
              <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.123456789!2d-65.6536!3d47.6176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b8b8b8b8b8b8%3A0x1234567890abcdef!2s10%20Lindsay%20St%2C%20Bathurst%2C%20NB%20E2A%207J8%2C%20Canada!5e1!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                  width="100%" 
                  height="300" 
                  style="border:0; border-radius: 8px;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                <div style="padding: 15px; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white;">
                  <p style="margin: 0; font-weight: 600; text-align: center;">Satellite View - Property and Surrounding Area</p>
                </div>
              </div>
            </div>
          </div>
        ` 
      },
      { 
        id: 'sec-3-3', 
        title: '3.3 Municipal Data', 
        slug: 'municipal-data', 
        level: 2, 
        order: 2, 
        parentId: 'sec-3', 
        content: `
          <div style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); margin-bottom: 30px;">
            <h2 style="color: #1f2937; font-size: 1.5rem; font-weight: 600; margin-bottom: 25px; font-family: 'Inter', sans-serif;">3.3 Municipal Data</h2>
            
            <div style="background: #f0f9ff; padding: 25px; border-radius: 12px; border-left: 4px solid #0ea5e9; margin-bottom: 25px;">
              <h3 style="color: #1f2937; font-size: 1.2rem; font-weight: 600; margin: 0 0 15px 0;">City Statistics</h3>
              <p style="color: #374151; font-size: 1rem; line-height: 1.7; margin: 0;">Statistics Canada data showed the city of Bathurst had a population of 12,157 in the 2021 census. This is up from the population count of 11,897 in the 2016 census. Bathurst is the fourth largest of eight New Brunswick cities.</p>
            </div>
            
            <!-- Interactive Population Chart -->
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); padding: 25px; border-radius: 12px; border: 1px solid #10b981;">
              <h3 style="color: #1f2937; font-size: 1.2rem; font-weight: 600; margin: 0 0 20px 0; text-align: center;">Population Growth Trend</h3>
              <div style="display: flex; justify-content: space-around; align-items: end; height: 150px; background: white; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="width: 40px; height: 80px; background: linear-gradient(180deg, #3b82f6, #1e40af); border-radius: 4px 4px 0 0; margin-bottom: 10px;"></div>
                  <span style="font-size: 0.9rem; color: #6b7280; font-weight: 500;">2016</span>
                  <span style="font-size: 0.8rem; color: #1f2937; font-weight: 600;">11,897</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="width: 40px; height: 95px; background: linear-gradient(180deg, #10b981, #059669); border-radius: 4px 4px 0 0; margin-bottom: 10px;"></div>
                  <span style="font-size: 0.9rem; color: #6b7280; font-weight: 500;">2021</span>
                  <span style="font-size: 0.8rem; color: #1f2937; font-weight: 600;">12,157</span>
                </div>
              </div>
              <p style="text-align: center; color: #059669; font-size: 0.9rem; font-weight: 600; margin: 0;">↗ 2.2% Growth Rate</p>
            </div>
          </div>
        ` 
      },
    ],
  },
  
  // 4.0 MARKET DATA
  {
    id: 'sec-4',
    title: '4.0 Market Data',
    slug: 'market-data',
    level: 1,
    order: 4,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">4.0 MARKET DATA</h1><p>This section analyzes current market conditions affecting property values in the subject area.</p>',
    children: [
      { id: 'sec-4-1', title: '4.1 Potential Impact of US Tariffs', slug: 'us-tariffs-impact', level: 2, order: 0, parentId: 'sec-4', content: '<h2>4.1 Potential Impact of US Tariffs</h2><p>Current US trade policies and tariffs may have indirect effects on the local economy and real estate market. The appraiser has considered these factors in the market analysis.</p>' },
      { id: 'sec-4-2', title: '4.2 Bank of Canada Target Interest Rate', slug: 'interest-rate', level: 2, order: 1, parentId: 'sec-4', content: '<h2>4.2 Bank of Canada Target Interest Rate</h2><p>The Bank of Canada target interest rate significantly influences mortgage rates and real estate market activity. Current rate: 3.25%</p>' },
      { id: 'sec-4-3', title: '4.3 CMHC Data - New Brunswick', slug: 'cmhc-data', level: 2, order: 2, parentId: 'sec-4', content: '<h2>4.3 CMHC Data - New Brunswick</h2><p>CMHC data indicates a vacancy rate of 2.1% and average 2BR rent of $1,150 in the region.</p>' },
    ],
  },
  
  // 5.0 ZONING AND USE RESTRICTIONS
  {
    id: 'sec-5',
    title: '5.0 Zoning and Use Restrictions',
    slug: 'zoning-use-restrictions',
    level: 1,
    order: 5,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">5.0 ZONING AND USE RESTRICTIONS</h1><p>This section details the zoning classification and applicable land use restrictions for the subject property.</p>',
    children: [
      { id: 'sec-5-1', title: '5.1 Zoning', slug: 'zoning', level: 2, order: 0, parentId: 'sec-5', content: '<h2>5.1 Zoning</h2><p>The subject property is zoned R-3 (Multi-Family Residential), which permits multi-unit residential development.</p>' },
      { id: 'sec-5-2', title: '5.2 Residential Rental Regulations', slug: 'rental-regulations', level: 2, order: 1, parentId: 'sec-5', content: '<h2>5.2 Residential Rental Regulations</h2><p>The property is subject to provincial residential tenancy regulations governing landlord-tenant relationships.</p>' },
      { id: 'sec-5-3', title: '5.3 Other Land Use Controls', slug: 'other-land-use', level: 2, order: 2, parentId: 'sec-5', content: '<h2>5.3 Other Land Use Controls</h2><p>No additional land use controls or restrictions were identified that would materially affect the property value.</p>' },
      { id: 'sec-5-4', title: '5.4 Analysis of Land Use Controls', slug: 'land-use-analysis', level: 2, order: 3, parentId: 'sec-5', content: '<h2>5.4 Analysis of Land Use Controls</h2><p>The current zoning is consistent with the existing use of the property and does not impose any unusual restrictions.</p>' },
    ],
  },
  
  // 6.0 REAL PROPERTY TAXES AND ASSESSMENTS
  {
    id: 'sec-6',
    title: '6.0 Real Property Taxes and Assessments',
    slug: 'taxes-assessments',
    level: 1,
    order: 6,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">6.0 REAL PROPERTY TAXES AND ASSESSMENTS</h1><p>This section provides information on property taxation and assessment history.</p>',
    children: [
      { id: 'sec-6-1', title: '6.1 Assessment and Taxes', slug: 'assessment-taxes', level: 2, order: 0, parentId: 'sec-6', content: '<h2>6.1 Assessment and Taxes</h2><p>Current Assessed Value: $425,000. Annual Property Tax: $6,375.</p>' },
      { id: 'sec-6-2', title: '6.2 Assessment History', slug: 'assessment-history', level: 2, order: 1, parentId: 'sec-6', content: '<h2>6.2 Assessment History</h2><p>Assessment values have increased steadily from $380,000 (2022) to $425,000 (2025).</p>' },
    ],
  },
  
  // 7.0 LAND DESCRIPTION
  {
    id: 'sec-7',
    title: '7.0 Land Description',
    slug: 'land-description',
    level: 1,
    order: 7,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">7.0 LAND DESCRIPTION</h1><p>This section describes the physical characteristics of the land.</p>',
    children: [
      { id: 'sec-7-1', title: '7.1 Site Illustration', slug: 'site-illustration', level: 2, order: 0, parentId: 'sec-7', content: '<h2>7.1 Site Illustration</h2><p>Site illustrations and survey information are included in the Addenda.</p>' },
      { id: 'sec-7-2', title: '7.2 Site Imagery', slug: 'site-imagery', level: 2, order: 1, parentId: 'sec-7', content: '<h2>7.2 Site Imagery</h2><p>Aerial and street-level imagery of the subject site are included in the Addenda.</p>' },
      { id: 'sec-7-3', title: '7.3 General', slug: 'land-general', level: 2, order: 2, parentId: 'sec-7', content: '<h2>7.3 General</h2><p>The subject site is a rectangular lot with approximately 0.35 acres (15,246 sq ft) of land area.</p>' },
      { id: 'sec-7-4', title: '7.4 Terrain', slug: 'terrain', level: 2, order: 3, parentId: 'sec-7', content: '<h2>7.4 Terrain</h2><p>The terrain is generally level with adequate drainage. No significant topographical challenges were observed.</p>' },
      { id: 'sec-7-5', title: '7.5 Access', slug: 'access', level: 2, order: 4, parentId: 'sec-7', content: '<h2>7.5 Access</h2><p>The property has direct access from Lindsay Street, a paved municipal road.</p>' },
      { id: 'sec-7-6', title: '7.6 Soil Conditions', slug: 'soil-conditions', level: 2, order: 5, parentId: 'sec-7', content: '<h2>7.6 Soil Conditions</h2><p>No soil analysis was conducted. Soil conditions are assumed to be adequate for the existing improvements.</p>' },
      { id: 'sec-7-7', title: '7.7 Easements', slug: 'easements', level: 2, order: 6, parentId: 'sec-7', content: '<h2>7.7 Easements</h2><p>Standard utility easements are assumed to exist. No unusual easements were identified.</p>' },
      { id: 'sec-7-8', title: '7.8 Improvements', slug: 'land-improvements', level: 2, order: 7, parentId: 'sec-7', content: '<h2>7.8 Improvements</h2><p>Site improvements include paved parking areas, concrete walkways, and landscaping.</p>' },
      { id: 'sec-7-9', title: '7.9 Environmental Conditions', slug: 'environmental-conditions', level: 2, order: 8, parentId: 'sec-7', content: '<h2>7.9 Environmental Conditions</h2><p>No environmental assessment was conducted. The property is assumed to be free of environmental contamination.</p>' },
    ],
  },
  
  // 8.0 BUILDING DESCRIPTION
  {
    id: 'sec-8',
    title: '8.0 Building Description',
    slug: 'building-description',
    level: 1,
    order: 8,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">8.0 BUILDING DESCRIPTION</h1><p>This section provides a detailed description of the building improvements.</p>',
    children: [
      { id: 'sec-8-1', title: '8.1 Building Sketch', slug: 'building-sketch', level: 2, order: 0, parentId: 'sec-8', content: '<h2>8.1 Building Sketch</h2><p>Building floor plans and sketches are included in the Addenda.</p>' },
      { id: 'sec-8-2', title: '8.2 Age', slug: 'building-age', level: 2, order: 1, parentId: 'sec-8', content: '<h2>8.2 Age</h2><p>The building was constructed in 1985, making it approximately 40 years old.</p>' },
      { id: 'sec-8-3', title: '8.3 Areas', slug: 'building-areas', level: 2, order: 2, parentId: 'sec-8', content: '<h2>8.3 Areas</h2><p>Gross Building Area: 6,240 sq ft. Net Rentable Area: 5,616 sq ft.</p>' },
      { id: 'sec-8-4', title: '8.4 Style', slug: 'building-style', level: 2, order: 3, parentId: 'sec-8', content: '<h2>8.4 Style</h2><p>The building is a two-story, multi-unit residential structure with a flat roof design.</p>' },
      { id: 'sec-8-5', title: '8.5 Exterior', slug: 'building-exterior', level: 2, order: 4, parentId: 'sec-8', content: '<h2>8.5 Exterior</h2><p>Exterior finishes include vinyl siding, aluminum windows, and asphalt shingle roofing.</p>' },
      { id: 'sec-8-6', title: '8.6 Interior', slug: 'building-interior', level: 2, order: 5, parentId: 'sec-8', content: '<h2>8.6 Interior</h2><p>Interior finishes are typical for multi-family residential, including drywall, vinyl flooring, and standard fixtures.</p>' },
      { id: 'sec-8-7', title: '8.7 Services', slug: 'building-services', level: 2, order: 6, parentId: 'sec-8', content: '<h2>8.7 Services</h2><p>The building is serviced by municipal water and sewer, electric heating, and individual unit metering.</p>' },
      { id: 'sec-8-8', title: '8.8 Condition', slug: 'building-condition', level: 2, order: 7, parentId: 'sec-8', content: '<h2>8.8 Condition</h2><p>The overall condition of the building is rated as Average to Good, with regular maintenance evident.</p>' },
      { id: 'sec-8-9', title: '8.9 Effective Age and Remaining Economic Life', slug: 'effective-age', level: 2, order: 8, parentId: 'sec-8', content: '<h2>8.9 Effective Age and Remaining Economic Life</h2><p>Effective Age: 30 years. Remaining Economic Life: 25 years.</p>' },
      { id: 'sec-8-10', title: '8.10 Accommodation', slug: 'accommodation', level: 2, order: 9, parentId: 'sec-8', content: '<h2>8.10 Accommodation</h2><p>The building contains 6 residential units: 4 two-bedroom units and 2 one-bedroom units.</p>' },
      { id: 'sec-8-11', title: '8.11 Appliances', slug: 'appliances', level: 2, order: 10, parentId: 'sec-8', content: '<h2>8.11 Appliances</h2><p>Each unit is equipped with a refrigerator and stove. Laundry facilities are shared.</p>' },
    ],
  },
  
  // 9.0 HIGHEST AND BEST USE
  {
    id: 'sec-9',
    title: '9.0 Highest and Best Use',
    slug: 'highest-best-use',
    level: 1,
    order: 9,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">9.0 HIGHEST AND BEST USE</h1><p>This section analyzes the highest and best use of the subject property.</p>',
    children: [
      { id: 'sec-9-1', title: '9.1 Definition', slug: 'hbu-definition', level: 2, order: 0, parentId: 'sec-9', content: '<h2>9.1 Definition</h2><p>Highest and Best Use is defined as the reasonably probable and legal use of vacant land or an improved property that is physically possible, appropriately supported, financially feasible, and that results in the highest value.</p>' },
      { id: 'sec-9-2', title: '9.2 Existing Use', slug: 'existing-use', level: 2, order: 1, parentId: 'sec-9', content: '<h2>9.2 Existing Use</h2><p>The existing use is a multi-unit residential rental property.</p>' },
      { id: 'sec-9-3', title: '9.3 Highest and Best Use - As if Vacant', slug: 'hbu-vacant', level: 2, order: 2, parentId: 'sec-9', content: '<h2>9.3 Highest and Best Use - As if Vacant</h2><p>If vacant, the highest and best use would be multi-family residential development consistent with current zoning.</p>' },
      { id: 'sec-9-4', title: '9.4 Highest and Best Use - As Improved', slug: 'hbu-improved', level: 2, order: 3, parentId: 'sec-9', content: '<h2>9.4 Highest and Best Use - As Improved</h2><p>As improved, the highest and best use is continued operation as a multi-unit residential rental property.</p>' },
      { id: 'sec-9-5', title: '9.5 Effect of Assemblage on Value', slug: 'assemblage-effect', level: 2, order: 4, parentId: 'sec-9', content: '<h2>9.5 Effect of Assemblage on Value</h2><p>No assemblage potential was identified that would materially affect the property value.</p>' },
    ],
  },
  
  // 10.0 METHOD OF VALUATION
  {
    id: 'sec-10',
    title: '10.0 Method of Valuation',
    slug: 'method-valuation',
    level: 1,
    order: 10,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">10.0 METHOD OF VALUATION</h1><p>This section describes the valuation approaches applied in this appraisal.</p>',
    children: [
      { id: 'sec-10-1', title: '10.1 Cost Approach', slug: 'cost-approach', level: 2, order: 0, parentId: 'sec-10', content: '<h2>10.1 Cost Approach</h2><p>The Cost Approach was considered but not applied due to the age of the improvements.</p>' },
      { id: 'sec-10-2', title: '10.2 Income Approach', slug: 'income-approach', level: 2, order: 1, parentId: 'sec-10', content: '<h2>10.2 Income Approach</h2><p>The Income Approach was applied as the property is income-producing.</p>' },
      { id: 'sec-10-3', title: '10.3 Direct Comparison Approach', slug: 'direct-comparison', level: 2, order: 2, parentId: 'sec-10', content: '<h2>10.3 Direct Comparison Approach</h2><p>The Direct Comparison Approach was applied using comparable sales.</p>' },
      { id: 'sec-10-4', title: '10.4 Method Selection', slug: 'method-selection', level: 2, order: 3, parentId: 'sec-10', content: '<h2>10.4 Method Selection</h2><p>Both the Income Approach and Direct Comparison Approach were applied.</p>' },
    ],
  },
  
  // 11.0 INCOME APPROACH
  {
    id: 'sec-11',
    title: '11.0 Income Approach',
    slug: 'income-approach-detail',
    level: 1,
    order: 11,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">11.0 INCOME APPROACH</h1><p>This section details the Income Approach analysis.</p>',
    children: [
      { id: 'sec-11-1', title: '11.1 Method', slug: 'income-method', level: 2, order: 0, parentId: 'sec-11', content: '<h2>11.1 Method</h2><p>The Direct Capitalization method was applied.</p>' },
      { id: 'sec-11-2', title: '11.2 Applicability to Subject', slug: 'income-applicability', level: 2, order: 1, parentId: 'sec-11', content: '<h2>11.2 Applicability to Subject</h2><p>The Income Approach is highly applicable as the property is operated as a rental investment.</p>' },
      { id: 'sec-11-3', title: '11.3 Income', slug: 'income-analysis', level: 2, order: 2, parentId: 'sec-11', content: '<h2>11.3 Income</h2><p>Potential Gross Income: $80,400 annually.</p>' },
      { id: 'sec-11-4', title: '11.4 Comparable Market Rents', slug: 'comparable-rents', level: 2, order: 3, parentId: 'sec-11', content: '<h2>11.4 Comparable Market Rents</h2><p>Market rent analysis indicates current rents are at market levels.</p>' },
      { id: 'sec-11-5', title: '11.5 Stabilized Rents and Analysis of Impact of Leases', slug: 'stabilized-rents', level: 2, order: 4, parentId: 'sec-11', content: '<h2>11.5 Stabilized Rents and Analysis of Impact of Leases</h2><p>All units are on month-to-month tenancies at market rents.</p>' },
      { id: 'sec-11-6', title: '11.6 Laundry Income', slug: 'laundry-income', level: 2, order: 5, parentId: 'sec-11', content: '<h2>11.6 Laundry Income</h2><p>Estimated annual laundry income: $1,200</p>' },
      { id: 'sec-11-7', title: '11.7 Vacancy and Collection Loss Allowance', slug: 'vacancy-allowance', level: 2, order: 6, parentId: 'sec-11', content: '<h2>11.7 Vacancy and Collection Loss Allowance</h2><p>A 3% vacancy and collection loss allowance has been applied.</p>' },
      { id: 'sec-11-8', title: '11.8 Income and Expense History', slug: 'income-expense-history', level: 2, order: 7, parentId: 'sec-11', content: '<h2>11.8 Income and Expense History</h2><p>Historical data was reviewed and found consistent with market expectations.</p>' },
      { id: 'sec-11-9', title: '11.9 Operating Expenses', slug: 'operating-expenses', level: 2, order: 8, parentId: 'sec-11', content: '<h2>11.9 Operating Expenses</h2><p>Total Operating Expenses: $23,195 annually.</p>' },
      { id: 'sec-11-10', title: '11.10 Capitalization Rate', slug: 'cap-rate', level: 2, order: 9, parentId: 'sec-11', content: '<h2>11.10 Capitalization Rate</h2><p>Applied Capitalization Rate: 6.5%</p>' },
      { id: 'sec-11-11', title: '11.11 Income Approach Table', slug: 'income-table', level: 2, order: 10, parentId: 'sec-11', content: '<h2>11.11 Income Approach Table</h2><p>See detailed income analysis in Addenda.</p>' },
      { id: 'sec-11-12', title: '11.12 Income Approach Value Estimate', slug: 'income-value', level: 2, order: 11, parentId: 'sec-11', content: '<h2>11.12 Income Approach Value Estimate</h2><p>Value by Income Approach: $875,000</p>' },
    ],
  },
  
  // 12.0 DIRECT COMPARISON APPROACH
  {
    id: 'sec-12',
    title: '12.0 Direct Comparison Approach',
    slug: 'direct-comparison-approach',
    level: 1,
    order: 12,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">12.0 DIRECT COMPARISON APPROACH</h1><p>This section details the Direct Comparison Approach analysis.</p>',
    children: [
      { id: 'sec-12-1', title: '12.1 Method', slug: 'comparison-method', level: 2, order: 0, parentId: 'sec-12', content: '<h2>12.1 Method</h2><p>The Direct Comparison Approach compares the subject to similar properties that have recently sold.</p>' },
      { id: 'sec-12-2', title: '12.2 Comparable Indices', slug: 'comparable-indices', level: 2, order: 1, parentId: 'sec-12', content: '<h2>12.2 Comparable Indices</h2><p>Comparable sales were analyzed on a price per unit and price per square foot basis.</p>' },
      { id: 'sec-12-3', title: '12.3 Unit of Comparison', slug: 'unit-comparison', level: 2, order: 2, parentId: 'sec-12', content: '<h2>12.3 Unit of Comparison</h2><p>Primary unit of comparison: Price per unit.</p>' },
      { id: 'sec-12-4', title: '12.4 Map of Comparable Properties', slug: 'comparable-map', level: 2, order: 3, parentId: 'sec-12', content: '<h2>12.4 Map of Comparable Properties</h2><p>See location map in Addenda.</p>' },
      { id: 'sec-12-5', title: '12.5 Adjustments', slug: 'adjustments', level: 2, order: 4, parentId: 'sec-12', content: '<h2>12.5 Adjustments</h2><p>Adjustments were made for location, size, age, and condition.</p>' },
      { id: 'sec-12-6', title: '12.6 Building Area', slug: 'building-area-comp', level: 2, order: 5, parentId: 'sec-12', content: '<h2>12.6 Building Area</h2><p>Building area adjustments were applied as necessary.</p>' },
      { id: 'sec-12-7', title: '12.7 Comparability Analysis', slug: 'comparability-analysis', level: 2, order: 6, parentId: 'sec-12', content: '<h2>12.7 Comparability Analysis</h2><p>All comparables were deemed sufficiently similar to the subject.</p>' },
      { id: 'sec-12-8', title: '12.8 Analysis and Conclusion', slug: 'comparison-conclusion', level: 2, order: 7, parentId: 'sec-12', content: '<h2>12.8 Analysis and Conclusion</h2><p>Value by Direct Comparison Approach: $850,000</p>' },
    ],
  },
  
  // 13.0 REASONABLE EXPOSURE TIME
  {
    id: 'sec-13',
    title: '13.0 Reasonable Exposure Time',
    slug: 'exposure-time',
    level: 1,
    order: 13,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">13.0 REASONABLE EXPOSURE TIME</h1><p>Based on current market conditions, a reasonable exposure time for the subject property is estimated at 60-90 days.</p>',
  },
  
  // 14.0 RECONCILIATION AND FINAL VALUE ESTIMATE
  {
    id: 'sec-14',
    title: '14.0 Reconciliation and Final Value Estimate',
    slug: 'reconciliation',
    level: 1,
    order: 14,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">14.0 RECONCILIATION AND FINAL VALUE ESTIMATE</h1><p>This section reconciles the value indications from the approaches applied.</p>',
    children: [
      { id: 'sec-14-1', title: '14.1 Value Indications', slug: 'value-indications', level: 2, order: 0, parentId: 'sec-14', content: '<h2>14.1 Value Indications</h2><p>Income Approach: $875,000. Direct Comparison Approach: $850,000.</p>' },
      { id: 'sec-14-2', title: '14.2 Analysis and Conclusion', slug: 'final-conclusion', level: 2, order: 1, parentId: 'sec-14', content: '<h2>14.2 Analysis and Conclusion</h2><p>After reconciliation, the final market value estimate is <strong>$865,000</strong>.</p>' },
      { id: 'sec-14-3', title: '14.3 Relationship Between Sale Price and Market Value Estimate', slug: 'sale-price-relationship', level: 2, order: 2, parentId: 'sec-14', content: '<h2>14.3 Relationship Between Sale Price and Market Value Estimate</h2><p>The estimated market value is consistent with recent market activity.</p>' },
      { id: 'sec-14-4', title: '14.4 Effect on Value of Personal Property', slug: 'personal-property-effect', level: 2, order: 3, parentId: 'sec-14', content: '<h2>14.4 Effect on Value of Personal Property</h2><p>No personal property is included in this valuation.</p>' },
    ],
  },
  
  // 15.0 APPRAISER'S CERTIFICATION
  {
    id: 'sec-15',
    title: "15.0 Appraiser's Certification",
    slug: 'certification',
    level: 1,
    order: 15,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">15.0 APPRAISER\'S CERTIFICATION</h1><p>I certify that, to the best of my knowledge and belief, the statements of fact contained in this report are true and correct, and the reported analyses, opinions, and conclusions are limited only by the reported assumptions and limiting conditions.</p>',
  },
  
  // ADDENDA
  {
    id: 'addenda',
    title: 'Addenda',
    slug: 'addenda',
    level: 1,
    order: 16,
    content: '<h1 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">ADDENDA</h1><p>Supporting documentation and supplementary materials.</p>',
    children: [
      { id: 'appendix-a', title: 'Appendix A', slug: 'appendix-a', level: 2, order: 0, parentId: 'addenda', content: '<h2>Appendix A</h2><p>Property photographs and site imagery.</p>' },
      { id: 'appendix-b', title: 'Appendix B', slug: 'appendix-b', level: 2, order: 1, parentId: 'addenda', content: '<h2>Appendix B</h2><p>Comparable sales data sheets and location maps.</p>' },
    ],
  },
];
