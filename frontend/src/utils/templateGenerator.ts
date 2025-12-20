export const generateDefaultTemplate = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<div data-type="page" class="page" contenteditable="true">
  <div style="position: relative; width: 100%; height: 100%; background: #e8eef5; overflow: hidden; margin: 0; padding: 0;">
    
    <!-- Top Navy Curved Section -->
    <div style="position: absolute; top: 0; left: 0; width: 42%; height: 120px; background: #2d4a7c; z-index: 2;">
      <svg style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 60px;" viewBox="0 0 400 60" preserveAspectRatio="none">
        <path d="M0,0 L400,0 Q350,60 0,60 Z" fill="#2d4a7c"/>
      </svg>
    </div>

    <!-- Logo Section - Editable -->
    <div contenteditable="true" style="position: absolute; top: 100px; left: 110px; z-index: 10; cursor: text;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div style="width: 50px; height: 50px; background: #1a8fb8; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: -3px 3px 0 0 #1e3a5f;">
          <div style="width: 22px; height: 22px; background: #1e3a5f; border-radius: 50%; position: absolute; bottom: 8px; left: 8px;"></div>
        </div>
        <div style="text-align: center;">
          <div contenteditable="true" style="color: #2d4a7c; font-weight: 600; font-size: 15px; line-height: 1.2; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">Ingoude</div>
          <div contenteditable="true" style="color: #2d4a7c; font-size: 13px; line-height: 1; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">Company</div>
        </div>
      </div>
    </div>

    <!-- Main Title Section - Editable -->
    <div contenteditable="true" style="position: absolute; left: 100px; top: 230px; z-index: 4; cursor: text;">
      <h1 contenteditable="true" style="color: #2d4a7c; font-size: 3.8rem; font-weight: 700; line-height: 1.1; margin: 0; font-family: 'Segoe UI', Arial, sans-serif; letter-spacing: 0.5px; outline: none;">
        BUSINESS<br/>
        <span style="color: #2d4a7c; font-weight: 700;">REPORT</span><br/>
        <span style="color: #2d4a7c; font-size: 3.8rem; font-weight: 700;">2024</span>
      </h1>
      
      <div style="width: 3px; height: 60px; background: #2d4a7c; margin: 25px 0;"></div>
      
      <div style="color: #2d4a7c;">
        <div contenteditable="true" style="font-size: 13px; font-weight: 400; margin-bottom: 5px; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">Presented By</div>
        <div contenteditable="true" style="font-size: 20px; font-weight: 700; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">Aaron Loeb</div>
        <div contenteditable="true" style="font-size: 13px; font-weight: 400; margin-top: 10px; color: #2d4a7c; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">Senior Business Analyst</div>
        <div contenteditable="true" style="font-size: 12px; font-weight: 400; margin-top: 5px; color: #5a6b7c; font-family: 'Segoe UI', Arial, sans-serif; outline: none;">December 2024</div>
      </div>
    </div>

    <!-- Right Side Circular Image with Navy Border - Clickable to Replace -->
    <div onclick="document.getElementById('cover-image-input').click()" style="position: absolute; top: 50%; right: 40px; transform: translateY(-50%); width: 380px; height: 380px; z-index: 6; cursor: pointer;">
      <input type="file" id="cover-image-input" accept="image/*" style="display: none;" />
      <div style="position: relative; width: 100%; height: 100%;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: #2d4a7c; padding: 12px; box-sizing: border-box;">
          <div style="width: 100%; height: 100%; border-radius: 50%; background: white; padding: 8px; box-sizing: border-box;">
            <div style="width: 100%; height: 100%; border-radius: 50%; overflow: hidden; position: relative;">
              <img id="cover-image" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjQ4MCIgdmlld0JveD0iMCAwIDQ4MCA0ODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJza3lHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZGQ4YTc7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjI1JSIgc3R5bGU9InN0b3AtY29sb3I6I2Y5YjM5MjtzdG9wLW9wYWNpdHk6MSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTk5Yjc3O3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSI3NSUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2YWFkZGE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYTg1YzY7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjQ4MCIgZmlsbD0idXJsKCNza3lHcmFkaWVudCkiLz48ZyBvcGFjaXR5PSIwLjkiPjxyZWN0IHg9IjYwIiB5PSIzNDAiIHdpZHRoPSIyOCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMyZDRhN2MiLz48cmVjdCB4PSIxMDAiIHk9IjMwMCIgd2lkdGg9IjM1IiBoZWlnaHQ9IjE4MCIgZmlsbD0iIzFhM2E1YSIvPjxyZWN0IHg9IjE1MCIgeT0iMjYwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjIwIiBmaWxsPSIjMmQ0YTdjIi8+PHJlY3QgeD0iMjA1IiB5PSIyMjAiIHdpZHRoPSI0NSIgaGVpZ2h0PSIyNjAiIGZpbGw9IiMxYTNhNWEiLz48cmVjdCB4PSIyNjUiIHk9IjI0MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzJkNGE3YyIvPjxyZWN0IHg9IjMxOCIgeT0iMjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWEzYTVhIi8+PHJlY3QgeD0iMzczIiB5PSIzMjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIxNjAiIGZpbGw9IiMyZDRhN2MiLz48L2c+PHRleHQgeD0iMjQwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI2MDAiIG9wYWNpdHk9IjAuOSI+Q2xpY2sgdG8gcmVwbGFjZSBpbWFnZTwvdGV4dD48L3N2Zz4=" 
                   alt="Click to replace image" 
                   style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); color: white; padding: 8px 16px; border-radius: 4px; font-size: 12px; opacity: 0; transition: opacity 0.3s; pointer-events: none;" class="hover-text">Click to replace</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navy Curved Wave -->
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 280px; z-index: 3;">
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" viewBox="0 0 800 280" preserveAspectRatio="none">
        <path d="M0,100 Q200,40 400,80 T800,100 L800,280 L0,280 Z" fill="#2d4a7c"/>
      </svg>
    </div>

    <!-- Bottom Light Blue Curved Wave -->
    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 200px; z-index: 4;">
      <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" viewBox="0 0 800 200" preserveAspectRatio="none">
        <path d="M0,80 Q200,20 400,60 T800,80 L800,200 L0,200 Z" fill="#1a8fb8"/>
      </svg>
    </div>

    <!-- Bottom Info Bar - Editable -->
    <div contenteditable="true" style="position: absolute; bottom: 30px; left: 100px; z-index: 5; color: white; font-family: 'Segoe UI', Arial, sans-serif; outline: none; cursor: text;">
      <div style="font-size: 11px; opacity: 0.9; margin-bottom: 3px;">Contact: info@ingoude.com | +1 (555) 123-4567</div>
      <div style="font-size: 11px; opacity: 0.9;">www.ingoude.com</div>
    </div>

  </div>
</div>

<div data-type="page" class="page">
  <h1 id="table-of-contents" style="text-align: center; margin-bottom: 2rem; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 1rem;">Table of Contents</h1>
  
  <div style="margin: 2rem 0; line-height: 2.2; font-family: 'Times New Roman', serif;">
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">1.0</span>
        <a href="#executive-summary" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Executive Summary</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">1</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">2.0</span>
        <a href="#introduction" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Introduction</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">2</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.5rem 0 0.5rem 2rem; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 500; color: #6b7280; margin-right: 1rem; min-width: 3rem;">2.1</span>
        <a href="#background" style="color: #2563eb; text-decoration: none;">Background</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">2</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.5rem 0 0.5rem 2rem; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 500; color: #6b7280; margin-right: 1rem; min-width: 3rem;">2.2</span>
        <a href="#objectives" style="color: #2563eb; text-decoration: none;">Objectives</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">2</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">3.0</span>
        <a href="#project-overview" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Project Overview</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">3</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">4.0</span>
        <a href="#methodology" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Methodology</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">4</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">5.0</span>
        <a href="#analysis" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Analysis</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">5</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">6.0</span>
        <a href="#findings" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Findings</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">6</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">7.0</span>
        <a href="#conclusion" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Conclusion</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">7</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #d1d5db; padding: 0.75rem 0; align-items: center;">
      <span style="display: flex; align-items: center;">
        <span style="font-weight: 600; color: #1f2937; margin-right: 1rem; min-width: 3rem;">8.0</span>
        <a href="#appendices" style="color: #2563eb; text-decoration: none; font-size: 1.05rem;">Appendices</a>
      </span>
      <span style="font-weight: 500; color: #6b7280;">8</span>
    </div>
  </div>
</div>

<div data-type="page" class="page">
  <h1 id="executive-summary" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Executive Summary</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This executive summary provides a concise overview of the key findings, recommendations, and conclusions presented in this report. The analysis conducted reveals significant insights that will inform strategic decision-making and future planning initiatives.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Key Findings</h2>
  <ul style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Primary finding that addresses the main research question</li>
    <li style="margin-bottom: 0.5rem;">Secondary insights that support the overall analysis</li>
    <li style="margin-bottom: 0.5rem;">Critical observations that impact recommendations</li>
  </ul>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Recommendations</h2>
  <ol style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Immediate action items for implementation</li>
    <li style="margin-bottom: 0.5rem;">Medium-term strategic initiatives</li>
    <li style="margin-bottom: 0.5rem;">Long-term considerations for sustained impact</li>
  </ol>
</div>

<div data-type="page" class="page">
  <h1 id="introduction" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Introduction</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This report presents a comprehensive analysis of [subject matter]. The purpose of this document is to provide stakeholders with detailed insights, evidence-based conclusions, and actionable recommendations based on thorough research and analysis.
  </p>
  
  <h2 id="background" style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Background</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The context and background information that led to this analysis includes several key factors that have shaped the current landscape. Understanding these foundational elements is crucial for interpreting the findings and recommendations presented in subsequent sections.
  </p>
  
  <h2 id="objectives" style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Objectives</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The primary objectives of this report are to:
  </p>
  <ul style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Analyze current conditions and trends</li>
    <li style="margin-bottom: 0.5rem;">Identify key challenges and opportunities</li>
    <li style="margin-bottom: 0.5rem;">Provide evidence-based recommendations</li>
    <li style="margin-bottom: 0.5rem;">Establish a framework for future action</li>
  </ul>
</div>

<div data-type="page" class="page">
  <h1 id="project-overview" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Project Overview</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This section provides a detailed overview of the project scope, timeline, and key stakeholders involved in the analysis. The project was designed to address specific business needs and strategic objectives.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Project Scope</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The scope of this project encompasses multiple dimensions of analysis, including quantitative data review, qualitative assessments, and stakeholder consultations. The comprehensive approach ensures that all relevant factors are considered in the final recommendations.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Timeline and Milestones</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
    <thead>
      <tr style="background-color: #f9fafb;">
        <th style="border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; font-weight: 600;">Phase</th>
        <th style="border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; font-weight: 600;">Duration</th>
        <th style="border: 1px solid #d1d5db; padding: 0.75rem; text-align: left; font-weight: 600;">Key Deliverables</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Planning</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">2 weeks</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Project charter, scope definition</td>
      </tr>
      <tr style="background-color: #f9fafb;">
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Data Collection</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">4 weeks</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Raw data, stakeholder interviews</td>
      </tr>
      <tr>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Analysis</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">3 weeks</td>
        <td style="border: 1px solid #d1d5db; padding: 0.75rem;">Findings, preliminary recommendations</td>
      </tr>
    </tbody>
  </table>
</div>

<div data-type="page" class="page">
  <h1 id="methodology" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Methodology</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The methodology employed in this analysis follows established best practices for research and data analysis. A mixed-methods approach was utilized to ensure comprehensive coverage of all relevant aspects.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Research Design</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The research design incorporates both quantitative and qualitative elements to provide a holistic view of the subject matter. This approach allows for triangulation of findings and increases the reliability of conclusions.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Data Sources</h2>
  <ul style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Primary data collection through surveys and interviews</li>
    <li style="margin-bottom: 0.5rem;">Secondary data from industry reports and databases</li>
    <li style="margin-bottom: 0.5rem;">Historical data analysis for trend identification</li>
    <li style="margin-bottom: 0.5rem;">Comparative analysis with industry benchmarks</li>
  </ul>
  
  <div style="margin: 2rem 0; padding: 1rem; background-color: #f0f9ff; border-left: 4px solid #0ea5e9; border-radius: 4px;">
    <p style="margin: 0; color: #0c4a6e; font-style: italic;">
      <strong>Note:</strong> All data collection and analysis procedures followed ethical guidelines and maintained participant confidentiality throughout the process.
    </p>
  </div>
</div>

<div data-type="page" class="page">
  <h1 id="analysis" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Analysis</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This section presents the detailed analysis of collected data, including statistical findings, trend analysis, and comparative assessments. The analysis is structured to address each research objective systematically.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Statistical Overview</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The statistical analysis reveals several significant patterns and relationships within the data. Key metrics and performance indicators demonstrate clear trends that inform our understanding of the current situation.
  </p>
  
  <div style="margin: 1.5rem 0; text-align: center;">
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNEMUQ1REIiLz4KPHN2ZyB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiPgogIDxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9IiMzQjgyRjYiLz4KICA8cmVjdCB4PSI2MCIgeT0iNjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzEwQjk4MSIvPgogIDxyZWN0IHg9IjEyMCIgeT0iNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0Y1OTUxNSIvPgogIDxyZWN0IHg9IjE4MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4KPHR0ZXh0IHg9IjI1MCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkNsaWNrIHRvIHJlcGxhY2UgY2hhcnQ8L3RleHQ+Cjwvc3ZnPg==" 
         alt="Analysis Chart Placeholder" 
         style="max-width: 500px; height: 300px; border: 1px solid #d1d5db; border-radius: 8px; cursor: pointer;" />
    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #6b7280; font-style: italic;">
      Figure 1: Key Performance Indicators Over Time
    </p>
  </div>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Trend Analysis</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The trend analysis indicates consistent patterns across multiple time periods, with notable variations during specific intervals that correlate with external factors and market conditions.
  </p>
</div>

<div data-type="page" class="page">
  <h1 id="findings" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Findings</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    Based on the comprehensive analysis conducted, several key findings have emerged that address the original research objectives and provide valuable insights for decision-making.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Primary Findings</h2>
  
  <div style="margin: 1rem 0; padding: 1rem; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 4px;">
    <h3 style="margin: 0 0 0.5rem 0; color: #15803d; font-size: 1.1rem;">Finding 1: Positive Trend Identification</h3>
    <p style="margin: 0; color: #166534; line-height: 1.5;">
      The analysis reveals a consistent upward trend in key performance metrics, indicating successful implementation of previous recommendations and strategic initiatives.
    </p>
  </div>
  
  <div style="margin: 1rem 0; padding: 1rem; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
    <h3 style="margin: 0 0 0.5rem 0; color: #d97706; font-size: 1.1rem;">Finding 2: Areas for Improvement</h3>
    <p style="margin: 0; color: #92400e; line-height: 1.5;">
      Several operational areas show potential for optimization, particularly in resource allocation and process efficiency, which could yield significant improvements.
    </p>
  </div>
  
  <div style="margin: 1rem 0; padding: 1rem; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
    <h3 style="margin: 0 0 0.5rem 0; color: #dc2626; font-size: 1.1rem;">Finding 3: Critical Challenges</h3>
    <p style="margin: 0; color: #991b1b; line-height: 1.5;">
      Certain challenges require immediate attention to prevent potential negative impacts on overall performance and strategic objectives.
    </p>
  </div>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Supporting Evidence</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The findings are supported by robust data analysis, stakeholder feedback, and comparative benchmarking against industry standards. Statistical significance tests confirm the reliability of observed patterns.
  </p>
</div>

<div data-type="page" class="page">
  <h1 id="conclusion" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Conclusion</h1>
  
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This comprehensive analysis provides valuable insights into the current state and future opportunities for improvement. The findings demonstrate both strengths to build upon and areas requiring strategic attention.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Summary of Key Points</h2>
  <ul style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Successful implementation of previous initiatives has yielded positive results</li>
    <li style="margin-bottom: 0.5rem;">Opportunities exist for further optimization and efficiency improvements</li>
    <li style="margin-bottom: 0.5rem;">Strategic challenges require proactive management and resource allocation</li>
    <li style="margin-bottom: 0.5rem;">Stakeholder engagement remains crucial for continued success</li>
  </ul>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Strategic Recommendations</h2>
  <ol style="margin-bottom: 1rem; padding-left: 1.5rem; line-height: 1.6; color: #374151;">
    <li style="margin-bottom: 0.5rem;">Implement immediate corrective actions for identified critical issues</li>
    <li style="margin-bottom: 0.5rem;">Develop medium-term strategies to capitalize on identified opportunities</li>
    <li style="margin-bottom: 0.5rem;">Establish monitoring systems to track progress and performance</li>
    <li style="margin-bottom: 0.5rem;">Schedule regular review cycles to ensure continued alignment with objectives</li>
  </ol>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Next Steps</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    The implementation of these recommendations should follow a phased approach, with priority given to critical issues and high-impact opportunities. Regular monitoring and adjustment will ensure optimal outcomes and sustained improvement.
  </p>
</div>

<div data-type="page" class="page">
  <h1 id="appendices" style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">Appendices</h1>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Appendix A: Data Sources</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    This appendix contains detailed information about all data sources used in the analysis, including collection methods, sample sizes, and data quality assessments.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Appendix B: Statistical Analysis</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    Detailed statistical outputs, including regression analyses, correlation matrices, and significance tests supporting the main findings presented in the report.
  </p>
  
  <h2 style="color: #1f2937; margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">Appendix C: Stakeholder Feedback</h2>
  <p style="margin-bottom: 1rem; line-height: 1.6; color: #374151;">
    Summary of stakeholder interviews and feedback sessions, including key themes, concerns, and suggestions for improvement.
  </p>
  
  <div style="margin: 2rem 0; padding: 1rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
    <p style="margin: 0; color: #475569; font-size: 0.9rem; text-align: center;">
      <em>End of Report</em>
    </p>
  </div>
</div>
  `.trim();
};
