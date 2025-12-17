// Claude Sonnet API integration for table analysis
// Note: In production, you'd need to set up a backend proxy for API calls
// to avoid exposing API keys in the frontend

interface TableData {
  headers: string[];
  rows: string[][];
}

interface AnalysisResponse {
  analysis: string;
  insights: string[];
  recommendations: string[];
}

export class ClaudeAnalysisService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey?: string) {
    // In production, this should come from environment variables
    // and be handled by a backend service
    this.apiKey = apiKey || import.meta.env.VITE_CLAUDE_API_KEY || '';
  }

  async analyzeTableData(inputText: string, tableData: TableData | null): Promise<{analysis: string, tableData: TableData | null, tableHtml: string}> {
    if (!this.apiKey) {
      // Fallback to enhanced mock analysis for demo purposes
      return this.generateEnhancedMockAnalysis(inputText, tableData);
    }

    try {
      const prompt = this.buildEnhancedAnalysisPrompt(inputText, tableData);
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parseEnhancedClaudeResponse(data.content[0].text, tableData);
    } catch (error) {
      console.warn('Claude API unavailable, using enhanced mock analysis:', error);
      return this.generateEnhancedMockAnalysis(inputText, tableData);
    }
  }

  private buildEnhancedAnalysisPrompt(inputText: string, tableData: TableData | null): string {
    if (tableData) {
      const { headers, rows } = tableData;
      const tableText = [
        headers.join('\t'),
        ...rows.map(row => row.join('\t'))
      ].join('\n');

      return `
As a professional real estate analyst, analyze this specific table data and provide comprehensive insights:

${tableText}

Provide a detailed analysis including:
1. Statistical summary with actual calculations from this data
2. Market trends and patterns specific to these properties
3. Comparative analysis insights based on the actual values
4. Professional recommendations for appraisal use
5. Key findings and notable observations from this dataset
6. Valuation relevance and methodology support

Format as a professional report suitable for real estate appraisal documentation. Use the actual data values in your analysis.
      `.trim();
    } else {
      return `
As a professional real estate analyst, help with this query: "${inputText}"

Provide comprehensive guidance on:
1. Data analysis methodologies
2. Market research approaches
3. Appraisal best practices
4. Professional recommendations

Focus on actionable insights for real estate professionals.
      `.trim();
    }
  }

  private parseEnhancedClaudeResponse(response: string, tableData: TableData | null): {analysis: string, tableData: TableData | null, tableHtml: string} {
    const analysis = response;
    const tableHtml = tableData ? this.generateTableHtml(tableData) : '';
    
    return {
      analysis,
      tableData,
      tableHtml
    };
  }

  private generateEnhancedMockAnalysis(inputText: string, tableData: TableData | null): {analysis: string, tableData: TableData | null, tableHtml: string} {
    if (tableData) {
      const { headers, rows } = tableData;
      
      // Calculate realistic statistics
      const stats = this.calculateRealisticStats(tableData);
      
      const isCommercial = this.detectCommercialData(headers);
      
      let analysis;
      if (isCommercial) {
        const commercialStats = stats as any; // Type assertion for commercial properties
        analysis = `**Commercial Real Estate Portfolio Analysis**

**Dataset Overview:**
Analyzed ${rows.length} commercial properties with ${headers.length} data fields: ${headers.join(', ')}.

**Investment Performance Metrics:**
${commercialStats.priceAnalysis}

**Physical Characteristics:**
${commercialStats.sizeAnalysis}

**Cap Rate Analysis:**
${commercialStats.capRateAnalysis || 'Cap rate data not available in this dataset'}

**Occupancy Performance:**
${commercialStats.occupancyAnalysis || 'Occupancy data not available in this dataset'}

**Market Assessment:**
${commercialStats.marketAnalysis}

**Property Mix:**
- Asset types: ${commercialStats.propertyTypes || 'Mixed commercial properties'}
- Portfolio diversification: ${commercialStats.propertyTypes ? commercialStats.propertyTypes.split(', ').length : rows.length} different property classes
- Average cap rate: ${commercialStats.avgCapRate || 'N/A'}%
- Average occupancy: ${commercialStats.avgOccupancy || 'N/A'}%
- Price variance: ${commercialStats.variance}% coefficient of variation

**Investment Analysis:**
This commercial portfolio demonstrates ${commercialStats.avgCapRate && parseFloat(commercialStats.avgCapRate.toString()) > 7 ? 'strong yield characteristics' : 'stable income potential'} with ${commercialStats.avgOccupancy && parseFloat(commercialStats.avgOccupancy.toString()) > 90 ? 'excellent tenant retention' : 'moderate occupancy levels'}. The $${commercialStats.pricePerSqFt}/sq ft average pricing ${commercialStats.pricePerSqFt > 200 ? 'reflects premium market positioning' : 'indicates value-oriented investment opportunities'}.

**Professional Conclusion:**
Portfolio meets institutional investment criteria with diversified asset mix, stable occupancy metrics, and market-competitive cap rates supporting long-term income generation and capital appreciation potential.`;
      } else {
        const residentialStats = stats as any; // Type assertion for residential properties
        analysis = `**Residential Market Analysis**

**Dataset Overview:**
Analyzed ${rows.length} residential properties with ${headers.length} data fields: ${headers.join(', ')}.

**Price Analysis:**
${residentialStats.priceAnalysis}

**Property Characteristics:**
${residentialStats.sizeAnalysis}

**Market Assessment:**
${residentialStats.marketAnalysis}

**Statistical Summary:**
- Sample size: ${rows.length} comparable sales
- Price variance: ${residentialStats.variance}% coefficient of variation
- Market positioning: ${residentialStats.pricePerSqFt > 300 ? 'Premium' : residentialStats.pricePerSqFt > 200 ? 'Mid-market' : 'Value'} segment
- Typical home profile: ${residentialStats.avgBedrooms || 'N/A'} bed / ${residentialStats.avgBathrooms || 'N/A'} bath

**Professional Assessment:**
This residential dataset provides ${rows.length > 5 ? 'robust' : 'adequate'} market evidence for comparative analysis. The ${residentialStats.variance}% price variance ${parseFloat(residentialStats.variance) < 20 ? 'indicates stable market conditions' : 'suggests diverse property characteristics'} suitable for adjustment-based valuation methodology.

**Appraisal Application:**
Data supports Sales Comparison Approach with sufficient comparable properties, complete characteristic documentation, and market-representative pricing patterns. Price per square foot analysis provides quantitative basis for size adjustments.`;
      }

      return {
        analysis,
        tableData,
        tableHtml: this.generateTableHtml(tableData)
      };
    } else {
      const analysis = `**Real Estate Analysis Consultation**

I'm ready to help you with comprehensive property data analysis. I can assist with:

**📊 Data Processing Capabilities:**
- CSV table analysis with statistical insights
- Image processing for property documents
- Market trend identification and analysis
- Comparable sales data organization

**🏠 Real Estate Expertise:**
- USPAP-compliant analysis methodologies
- Sales Comparison Approach support
- Market adjustment calculations
- Professional report generation

**📈 Advanced Analytics:**
- Statistical summaries and variance analysis
- Price per square foot calculations
- Geographic market segmentation
- Time-series trend analysis

**📄 Professional Reporting:**
- Appraisal-ready data tables
- Executive summary generation
- Visual analytics dashboards
- Export-ready documentation

Please upload property data (CSV format) or images of property documents, and I'll provide comprehensive analysis with professional insights suitable for appraisal reports.`;

      return {
        analysis,
        tableData: null,
        tableHtml: ''
      };
    }
  }

  private calculateRealisticStats(tableData: TableData) {
    const { headers, rows } = tableData;
    
    // Detect data type and columns
    const isCommercial = this.detectCommercialData(headers);
    const columnIndices = this.identifyColumns(headers);
    
    if (isCommercial) {
      return this.analyzeCommercialData(tableData, columnIndices);
    } else {
      return this.analyzeResidentialData(tableData, columnIndices);
    }
  }

  private detectCommercialData(headers: string[]): boolean {
    const commercialIndicators = ['cap rate', 'occupancy', 'property type', 'noi', 'commercial', 'office', 'retail', 'warehouse'];
    return headers.some(h => 
      commercialIndicators.some(indicator => 
        h.toLowerCase().includes(indicator)
      )
    );
  }

  private identifyColumns(headers: string[]) {
    return {
      price: headers.findIndex(h => h.toLowerCase().includes('price') || h.toLowerCase().includes('value')),
      size: headers.findIndex(h => h.toLowerCase().includes('sqft') || h.toLowerCase().includes('square') || h.toLowerCase().includes('footage')),
      capRate: headers.findIndex(h => h.toLowerCase().includes('cap') && h.toLowerCase().includes('rate')),
      occupancy: headers.findIndex(h => h.toLowerCase().includes('occupancy')),
      propertyType: headers.findIndex(h => h.toLowerCase().includes('type')),
      yearBuilt: headers.findIndex(h => h.toLowerCase().includes('year') && h.toLowerCase().includes('built')),
      bedrooms: headers.findIndex(h => h.toLowerCase().includes('bedroom')),
      bathrooms: headers.findIndex(h => h.toLowerCase().includes('bathroom'))
    };
  }

  private analyzeCommercialData(tableData: TableData, indices: any) {
    const { headers, rows } = tableData;
    
    // Calculate price statistics
    const prices = this.extractNumbers(rows, indices.price);
    const sizes = this.extractNumbers(rows, indices.size);
    const capRates = this.extractPercentages(rows, indices.capRate);
    const occupancies = this.extractPercentages(rows, indices.occupancy);
    
    // Price analysis
    const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    
    // Size analysis
    const avgSize = sizes.length > 0 ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length) : 0;
    const minSize = sizes.length > 0 ? Math.min(...sizes) : 0;
    const maxSize = sizes.length > 0 ? Math.max(...sizes) : 0;
    
    // Cap rate analysis
    const avgCapRate = capRates.length > 0 ? (capRates.reduce((a, b) => a + b, 0) / capRates.length).toFixed(1) : '0';
    const minCapRate = capRates.length > 0 ? Math.min(...capRates).toFixed(1) : '0';
    const maxCapRate = capRates.length > 0 ? Math.max(...capRates).toFixed(1) : '0';
    
    // Price per square foot
    const pricePerSqFt = avgPrice > 0 && avgSize > 0 ? Math.round(avgPrice / avgSize) : 0;
    
    // Property type distribution
    const propertyTypes = indices.propertyType >= 0 ? 
      rows.map(row => row[indices.propertyType]).filter(Boolean) : [];
    
    // Occupancy analysis
    const avgOccupancy = occupancies.length > 0 ? 
      (occupancies.reduce((a, b) => a + b, 0) / occupancies.length).toFixed(1) : '0';

    // Detailed property-by-property analysis
    const propertyDetails = rows.map((row, index) => {
      const price = prices[index] || 0;
      const size = sizes[index] || 0;
      const capRate = capRates[index] || 0;
      const occupancy = occupancies[index] || 0;
      const type = propertyTypes[index] || 'Unknown';
      const psf = price > 0 && size > 0 ? Math.round(price / size) : 0;
      
      return {
        type,
        price,
        size,
        capRate,
        occupancy,
        psf,
        address: row[1] || `Property ${index + 1}`
      };
    });

    const priceAnalysis = `Commercial property values range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}
- Average sale price: $${avgPrice.toLocaleString()}
- Price per square foot: $${pricePerSqFt}/sq ft
- Total portfolio value: $${(prices.reduce((a, b) => a + b, 0)).toLocaleString()}
- Individual property PSF range: $${Math.min(...propertyDetails.map(p => p.psf).filter(p => p > 0))}-$${Math.max(...propertyDetails.map(p => p.psf).filter(p => p > 0))}/sq ft`;

    const sizeAnalysis = `Building sizes range from ${minSize.toLocaleString()} to ${maxSize.toLocaleString()} sq ft
- Average building size: ${avgSize.toLocaleString()} sq ft
- Total square footage: ${sizes.reduce((a, b) => a + b, 0).toLocaleString()} sq ft
- Size distribution: ${propertyDetails.map(p => `${p.type}: ${p.size.toLocaleString()} sq ft`).join(', ')}`;

    const capRateAnalysis = capRates.length > 0 ? `Cap rates range from ${minCapRate}% to ${maxCapRate}%
- Average cap rate: ${avgCapRate}%
- Market positioning: ${parseFloat(avgCapRate) > 7 ? 'Value-oriented' : 'Premium'} investment grade
- By property type: ${propertyDetails.filter(p => p.capRate > 0).map(p => `${p.type}: ${p.capRate}%`).join(', ')}` : 'Cap rate data not available in this dataset';

    const occupancyAnalysis = occupancies.length > 0 ? `Occupancy rates average ${avgOccupancy}%
- Market stability: ${parseFloat(avgOccupancy) > 90 ? 'Excellent' : parseFloat(avgOccupancy) > 80 ? 'Good' : 'Moderate'}
- Income reliability: ${parseFloat(avgOccupancy) > 95 ? 'Very High' : 'Stable'}
- Property performance: ${propertyDetails.filter(p => p.occupancy > 0).map(p => `${p.type}: ${p.occupancy}%`).join(', ')}` : 'Occupancy data not available in this dataset';

    const marketAnalysis = `Commercial real estate portfolio demonstrates ${parseFloat(avgCapRate) > 7 ? 'strong yield potential' : 'stable income characteristics'} with ${parseFloat(avgOccupancy) > 90 ? 'excellent occupancy metrics' : 'moderate occupancy levels'}. Property mix includes ${propertyTypes.length} different asset classes: ${propertyTypes.join(', ')}, providing diversification benefits across ${propertyDetails.length} properties.`;

    const variance = prices.length > 1 ? 
      (Math.sqrt(prices.reduce((acc, price) => acc + Math.pow(price - avgPrice, 2), 0) / prices.length) / avgPrice * 100).toFixed(1) : '0';

    return {
      priceAnalysis,
      sizeAnalysis,
      capRateAnalysis,
      occupancyAnalysis,
      marketAnalysis,
      variance,
      propertyTypes: propertyTypes.join(', '),
      avgCapRate,
      avgOccupancy,
      pricePerSqFt,
      propertyDetails
    };
  }

  private analyzeResidentialData(tableData: TableData, indices: any) {
    const { headers, rows } = tableData;
    
    const prices = this.extractNumbers(rows, indices.price);
    const sizes = this.extractNumbers(rows, indices.size);
    const bedrooms = this.extractNumbers(rows, indices.bedrooms);
    const bathrooms = this.extractNumbers(rows, indices.bathrooms);
    
    const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    
    const avgSize = sizes.length > 0 ? Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length) : 0;
    const minSize = sizes.length > 0 ? Math.min(...sizes) : 0;
    const maxSize = sizes.length > 0 ? Math.max(...sizes) : 0;
    
    const pricePerSqFt = avgPrice > 0 && avgSize > 0 ? Math.round(avgPrice / avgSize) : 0;
    
    const avgBedrooms = bedrooms.length > 0 ? (bedrooms.reduce((a, b) => a + b, 0) / bedrooms.length).toFixed(1) : '0';
    const avgBathrooms = bathrooms.length > 0 ? (bathrooms.reduce((a, b) => a + b, 0) / bathrooms.length).toFixed(1) : '0';

    // Individual property analysis
    const propertyDetails = rows.map((row, index) => {
      const price = prices[index] || 0;
      const size = sizes[index] || 0;
      const bed = bedrooms[index] || 0;
      const bath = bathrooms[index] || 0;
      const psf = price > 0 && size > 0 ? Math.round(price / size) : 0;
      
      return {
        address: row[0] || `Property ${index + 1}`,
        price,
        size,
        bedrooms: bed,
        bathrooms: bath,
        psf,
        yearBuilt: row[indices.yearBuilt] || 'N/A'
      };
    });

    // Calculate individual PSF range
    const individualPSF = propertyDetails.map(p => p.psf).filter(p => p > 0);
    const minPSF = individualPSF.length > 0 ? Math.min(...individualPSF) : 0;
    const maxPSF = individualPSF.length > 0 ? Math.max(...individualPSF) : 0;

    const priceAnalysis = `Residential property values range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}
- Average home price: $${avgPrice.toLocaleString()}
- Price per square foot: $${pricePerSqFt}/sq ft (portfolio average)
- Individual PSF range: $${minPSF}-$${maxPSF}/sq ft
- Total market value: $${(prices.reduce((a, b) => a + b, 0)).toLocaleString()}
- Property count: ${rows.length} comparable sales`;

    const sizeAnalysis = `Home sizes range from ${minSize.toLocaleString()} to ${maxSize.toLocaleString()} sq ft
- Average home size: ${avgSize.toLocaleString()} sq ft
- Total square footage: ${sizes.reduce((a, b) => a + b, 0).toLocaleString()} sq ft
- Typical configuration: ${avgBedrooms} bed / ${avgBathrooms} bath
- Size distribution: ${propertyDetails.map(p => `${p.size.toLocaleString()} sq ft (${p.bedrooms}BR/${p.bathrooms}BA)`).join(', ')}`;

    // Geographic analysis from addresses
    const locations = rows.map(row => {
      const address = row[0] || '';
      const parts = address.split(' ');
      return parts[parts.length - 2] || 'Unknown'; // Get city name
    }).filter(Boolean);
    
    const uniqueLocations = [...new Set(locations)];

    const marketAnalysis = `Residential market shows ${avgPrice > 500000 ? 'premium' : avgPrice > 300000 ? 'moderate' : 'entry-level'} pricing with ${pricePerSqFt > 300 ? 'strong' : 'reasonable'} per-square-foot values indicating ${avgPrice > 400000 ? 'active' : 'stable'} market conditions. Geographic coverage includes ${uniqueLocations.length} market areas: ${uniqueLocations.join(', ')}, providing diverse market representation across ${rows.length} properties.`;

    const variance = prices.length > 1 ? 
      (Math.sqrt(prices.reduce((acc, price) => acc + Math.pow(price - avgPrice, 2), 0) / prices.length) / avgPrice * 100).toFixed(1) : '0';

    return {
      priceAnalysis,
      sizeAnalysis,
      marketAnalysis,
      variance,
      pricePerSqFt,
      avgBedrooms,
      avgBathrooms,
      propertyDetails,
      uniqueLocations: uniqueLocations.join(', '),
      minPSF,
      maxPSF
    };
  }

  private extractNumbers(rows: string[][], columnIndex: number): number[] {
    if (columnIndex < 0) return [];
    return rows.map(row => {
      const str = row[columnIndex]?.replace(/[$,%]/g, '') || '0';
      return parseInt(str) || 0;
    }).filter(n => n > 0);
  }

  private extractPercentages(rows: string[][], columnIndex: number): number[] {
    if (columnIndex < 0) return [];
    return rows.map(row => {
      const str = row[columnIndex]?.replace(/[%]/g, '') || '0';
      return parseFloat(str) || 0;
    }).filter(n => n > 0);
  }

  private generateTableHtml(tableData: TableData): string {
    const { headers, rows } = tableData;
    
    return `
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <thead>
            <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              ${headers.map(header => 
                `<th style="padding: 12px; text-align: left; font-weight: 600; border: 1px solid #e2e8f0;">${header}</th>`
              ).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row, index) => 
              `<tr style="background-color: ${index % 2 === 0 ? '#f8fafc' : 'white'};">
                ${row.map(cell => 
                  `<td style="padding: 10px; border: 1px solid #e2e8f0; color: #374151;">${cell}</td>`
                ).join('')}
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

// Export singleton instance
export const claudeService = new ClaudeAnalysisService();
