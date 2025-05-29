# **CoinCanvas Development Roadmap**

This roadmap provides a step-by-step guide to building **CoinCanvas**, a lightweight cryptocurrency dashboard using SvelteKit and the CoinGecko API. The app will feature live price charts, portfolio tracking, a currency converter, and browser notifications, with a focus on simplicity, functionality, and aesthetics for showcasing purposes. The app will be deployed on Vercel, with local storage used for simplicity (Neon can be added later if needed).

---

## **1\. Project Setup**

**Initialize SvelteKit Project**  
Use the following command to create a new SvelteKit project:

 npm create svelte@latest coincanvas

*  Choose the skeleton project and enable TypeScript if desired.

**Install Dependencies**  
Install necessary libraries, including a charting library for price visualizations:

 npm install chart.js

*  You can also install other dependencies like `svelte-chartjs` for easier integration with Svelte.

---

## **2\. API Integration**

* **Fetch Data from CoinGecko API**  
  Create utility functions to fetch:

  * Live prices for selected cryptocurrencies.  
  * Historical price data for charting.  
  * Conversion rates for the currency converter.

Example API call for live prices:

 async function fetchPrices() {  
  const response \= await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum\&vs\_currencies=usd');  
  return await response.json();  
}

*   
* **Handle API Rate Limits**  
  Implement basic caching (e.g., store data in memory or local storage) to reduce API calls and avoid hitting rate limits.

---

## **3\. Live Price Charts**

* **Display Real-Time Price Charts**  
  Use Chart.js (or a Svelte-compatible charting library) to create line charts for cryptocurrency prices.

**Periodic Updates**  
Set up a timer to refresh the chart data every minute:

 onMount(() \=\> {  
  fetchPrices();  
  setInterval(fetchPrices, 60000); // Update every minute  
});

* 

---

## **4\. Portfolio Tracking**

* **Create Portfolio Form**  
  Build a form component where users can add cryptocurrencies and their respective amounts.

* **Store Data in Local Storage**  
  Save the portfolio data in the browser’s local storage to persist user inputs.

* **Calculate Portfolio Value**  
  Use live price data to calculate and display the total value of the portfolio.

---

## **5\. Currency Converter**

* **Design Converter Component**  
  Create a component with inputs or dropdowns for selecting cryptocurrencies and fiat currencies.

**Fetch Conversion Rates**  
Use the CoinGecko API to get real-time conversion rates and perform calculations:

 async function convertCurrency(from, to, amount) {  
  const response \= await fetch(\`https://api.co临时决定，API调用过于频繁，超过了限制，可以尝试一下 Vite \+ Vue3 的开发体验，更快的冷启动、更快的热更新、更高的编译性能、更高的内存使用效率，详情请看 https://cn.vitejs.dev/    
  const rate \= (await response.json())\[from\]\[to\];  
  return amount \* rate;  
}

* 

---

## **6\. Browser Notifications**

* **Request Notification Permissions**  
  Use the Web Notifications API to request permission from the user.

**Implement Price Alerts**  
Allow users to set basic price alerts (e.g., notify when a cryptocurrency’s price changes by a certain percentage).

 Example:

 if (Notification.permission \=== 'granted') {  
  new Notification('Price Alert', { body: 'Bitcoin price has changed by 5%\!' });  
}

* 

---

## **7\. UI Design**

* **Create Responsive Layout**  
  Design a clean, minimalistic UI using Svelte components. Ensure the layout is responsive and works well on both desktop and mobile devices.

* **Focus on Aesthetics**  
  Use modern design principles to make the app visually appealing for showcasing. Consider using CSS frameworks like Tailwind CSS for faster styling.

---

## **8\. Testing**

* **Test Functionality**  
  Manually test all features:

  * Live price charts update correctly.  
  * Portfolio tracking saves and calculates values accurately.  
  * Currency converter works with different pairs.  
  * Notifications trigger as expected.  
* **Debug Issues**  
  Address any bugs or performance issues, ensuring smooth interactions and fast load times.

---

## **9\. Deployment**

**Deploy to Vercel**  
Use the SvelteKit adapter for Vercel:

 npm install \-D @sveltejs/adapter-vercel

*  Update `svelte.config.js` to use the Vercel adapter.

* **Configure Environment Variables**  
  If using API keys or other sensitive data, configure them in Vercel’s environment variables dashboard.

---

This roadmap ensures a structured and efficient development process for **CoinCanvas**, prioritizing simplicity and functionality while maintaining an aesthetically pleasing design for showcasing.

