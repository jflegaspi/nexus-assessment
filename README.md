# nexus-assessment

CLI Commands Used:

- shopify auth login - login to the store im using to do this task
- shopify app init - run to create app
- shopify app generate extension - ran to create app extension
- shopify app dev - create preview for the app
- shopify theme dev - start local theme preview and upload the theme
- shopify theme pull - pull changes or files from Shopify store
- shopify theme push - push file changes to shopify store

Scenario 1 — Theme App Extension
Delivery ETA & Returns Helper

Assumptions and Design Decisions
1. Delivery Estimate are calculated using:
    - Product Availability (in stock vs. preorder)
    - Region
    - Base time and cutoff time
2. Region based conditions are built inside extension to avoid backend dependencies
3. Data are passed as JSON object to avoid additional API Calls
4. All calculation are done inside a single JS module to avoid pollution
5. The widget is a theme app block so it can be place on any pages

Flow and Logic
1. Liquid > DOM
   - The block display object with variant availability, tags and current variant ID
   - JSON is embedded in a data attribute in the block container.
2. Region Rules JSON
   - The static JSON rules contains region name, delivery days, messages per region
3. Frontend Logic
   - JS reads product JSON, region rules JSON, block settings
   - Determine selected region
   - Apply region rules
   - Calculate ETA
   - Displays Messages: Arrives between this ETA and Region specific texts

Limitations:
If I have more time I can do:
1. Auto detection of customer location instead of manual input
2. Use shopify storefront API for real time inventory instead of liquid
3. Add localization for date format and messages


Scenario 2 - Checkout UI Extension
Free Shipping Bar

Assumptions and Design Decisions
1. The extesnion will be used in Checkout Order Summary
2. The free shipping limit is define as a constant in the code
3. Extension to read cart subtotal using Checkout UI Extension API's
4. Calculations will be done in the helper functions

Flow and Logic
1. Input: Cart Subtotal from Checkout API and Free Shipping value constant
2. Logic: Compare subtotal and free shpping value, if subtotal is less than threshold it will calculate remaining amount and display "$X more to get free shipping." If subtotal is more than threshold display "You are eligible to free shipping"
3. Currency Handling: Use shopify currency formatter in Checkout API and ensures proper formatting depending on store current currency

Limitations:
If I have more time I can do:
1. I can make it run and work T_T
2. Add progress bar styling
3. Can use threshold as a metafield or metaobject
4. Handle discount codes