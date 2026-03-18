#Delivery ETA

Steps I did:
Created App by using shopify app init
Created a block to display the shipping content based on what country you select.

Thought Process:

Task: Implement ETA for delivery
Solution: Create a block with ETA on it based on country with different copies.
Implementation: Create theme app extension for adding block. Used liquid for the block and used javascript for functionality.

Files:
App Name: delivery-eta-returns-helper
Extension: delivery-eta-returns-helper
Folders: assets, blocks
Folder Files:
assets - delivery.css, deliver.js
blocks - delivery-eta-helper.liquid
