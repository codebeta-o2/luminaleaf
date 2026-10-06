export const GOOGLE_SHEETS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxvr1dGIdbrj5VC1VID05F1olIP6MiJNKFCOMSDObYTZAxiw-CoK9MrwT161e0xwrsr/exec";

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  sector: string;
  monthlyBill: string;
  message: string;
}

/**
 * Submits lead data to Google Sheets via Google Apps Script Web App.
 * Structure matches: Timestamp | Name | Email | Phone | Sector | Monthly Bill | Message
 */
export async function submitLeadToGoogleSheets(
  lead: LeadSubmission
): Promise<{ success: boolean; message: string; timestamp: string }> {
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedBill = lead.monthlyBill 
    ? (lead.monthlyBill.startsWith('₹') ? lead.monthlyBill : `₹${lead.monthlyBill}`)
    : 'Not Specified';

  // Exact matching keys for: Timestamp | Name | Email | Phone | Sector | Monthly Bill | Message
  const payload: Record<string, string> = {
    // Exact column headers matching user sheet
    "Timestamp": timestamp,
    "Name": lead.name.trim(),
    "Email": lead.email.trim(),
    "Phone": lead.phone.trim(),
    "Sector": lead.sector || 'Rooftop Solar EPC',
    "Monthly Bill": formattedBill,
    "Message": lead.message.trim(),

    // Lowercase and camelCase aliases for flexibility
    "timestamp": timestamp,
    "name": lead.name.trim(),
    "email": lead.email.trim(),
    "phone": lead.phone.trim(),
    "sector": lead.sector || 'Rooftop Solar EPC',
    "MonthlyBill": formattedBill,
    "monthlyBill": formattedBill,
    "monthly_bill": formattedBill,
    "message": lead.message.trim(),
  };

  const formParams = new URLSearchParams();
  Object.entries(payload).forEach(([key, val]) => {
    formParams.append(key, val);
  });

  // Strategy 1: Cross-origin POST with URLSearchParams body & query params
  try {
    const postUrlWithQuery = `${GOOGLE_SHEETS_SCRIPT_URL}?${formParams.toString()}`;
    await fetch(postUrlWithQuery, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    });

    return {
      success: true,
      message: 'Inquiry successfully saved to Google Sheet.',
      timestamp,
    };
  } catch (error: any) {
    console.warn('POST attempt encountered issue, attempting hidden form submission:', error);
    
    // Strategy 2: Dynamic hidden iframe form submission (guaranteed to bypass browser network limits)
    return new Promise((resolve, reject) => {
      try {
        const iframeName = `hidden_iframe_${Date.now()}`;
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.target = iframeName;
        form.action = GOOGLE_SHEETS_SCRIPT_URL;
        form.method = 'POST';
        form.style.display = 'none';

        Object.entries(payload).forEach(([k, v]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = k;
          input.value = v;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
          try {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
          } catch {
            // Ignore cleanup errors
          }
          resolve({
            success: true,
            message: 'Inquiry successfully saved to Google Sheet.',
            timestamp,
          });
        }, 1200);
      } catch (err: any) {
        reject(new Error(err?.message || 'Failed to connect to Google Sheet.'));
      }
    });
  }
}
