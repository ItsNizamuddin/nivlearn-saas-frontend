# Regional pricing: VPN abuse and how to stop it

**Status:** Not implemented yet (decision: park for now). Last updated 2026-11-06.

## The problem

Batches are priced per currency in the CMS (USD is the mandatory default tier; INR and others
are optional extra tiers). Some regional prices are much cheaper than USD — e.g. a batch at
**$400** has an INR tier of **₹12,999 (≈ $150)**. A buyer outside India can try to get the
cheaper price by appearing to be in India (VPN, proxy) or by editing the request.

## Why "remember the first-visit country" doesn't help

Saving the country on the first visit (localStorage) is not a protection:

- A cheater simply connects the VPN **before** the first visit, or opens a private window
  (empty storage), and gets the cheap country saved.
- Anything stored in the browser can be edited by the visitor.
- It punishes genuine travellers (wrong price for 24h).

So the site re-checks the visitor's IP on every page load (for correct display), and price
**enforcement must happen on the server and at payment**.

## Current gaps

| # | Gap | Where |
|---|---|---|
| 1 | Checkout takes the currency from the URL (`/checkout?schedule=…&currency=INR`). A US visitor can type `currency=INR` and pay the INR price. | `src/app/checkout/page.tsx`, `src/app/api/payments/[action]/route.ts` (reads `currency` from the request body) |
| 2 | VPN / proxy / data-centre IPs get the regional price of whatever country they exit in. | `src/app/api/location/route.ts` |
| 3 | Billing address and phone country are not checked against the price currency. | `src/components/checkout/CustomerForm.tsx`, payments route |
| 4 | The Payment API accepts any `baseAmount` / `currency` it is sent. | Backend (`/public/payments/submit`) |

The amount itself is already safe: the price is looked up on the server from the schedule code
(`resolveCheckoutItem` in `src/services/payment.service.ts`), never taken from the browser. Only
the **currency choice** is open.

## Recommended fix (in order)

### 1. Server decides the currency at checkout (frontend)

- In the checkout page and the payments route, ignore `currency` from the URL/body.
- Work out the country on the server from the request IP: Cloudflare `cf-ipcountry` /
  Vercel `x-vercel-ip-country` first, ip-api as fallback.
- Map country → currency with `currencyForCountry` (`src/components/schedules/types.ts`);
  unknown → USD (the API's own fallback).
- Do the same lookup in `/api/payments/coupon` and `/api/payments/submit`, so the order is
  created in the server-chosen currency even if the client sends something else.

### 2. VPN / hosting IPs get the default USD price (frontend)

- ip-api's free tier can return `proxy` (VPN/proxy/Tor) and `hosting` (data centre) flags:
  add `proxy,hosting` to the `fields` list in `src/app/api/location/route.ts`.
- If either is true, use **USD** (base price) instead of the regional price — for display and
  at checkout. Only give a cheaper regional price when the IP looks like a normal residential /
  mobile connection.
- Example: the US VPN used in testing (169.197.85.170) is "PureVoltage Hosting Inc." — it would
  be flagged as hosting.
- Edge headers don't carry VPN info; when the country comes from `cf-ipcountry`, a cheaper
  regional price can still be cross-checked with ip-api at checkout only (1 lookup per order,
  well within limits).

### 3. Billing country must match the price currency (frontend)

- For INR orders: require billing country = India and a `+91` phone number (validate in the
  form and again in `/api/payments/submit`).
- Generalise with a currency → allowed countries map (EUR → euro-area countries, etc.).
- Low friction for genuine buyers; India GST invoices need an Indian address anyway.

### 4. Payment gateway settings (no code — ops)

The strongest single control, because a VPN cannot change a card's issuing country.

- **Razorpay:** keep international cards disabled for INR collection, or enable card-country
  restrictions, so INR prices can only be paid with Indian cards / UPI / net banking.
- **Stripe** (if enabled later): a Radar rule blocking payments where the order currency is a
  regional currency and the card country doesn't match (e.g. INR order with a non-`IN` card).

### 5. Backend enforcement (backend team)

Ask the payment service to enforce it too, so it holds even if someone calls the API directly:

- `/public/payments/submit`: recompute the price from the schedule code and validate the
  currency against the buyer's IP country (`X-User-IP` is already forwarded) and billing country.
- Reject or re-price to USD when they don't match.

## Display pages

Once checkout decides the price, the schedules pages only *display* prices, so re-checking the
IP on every load (current behaviour, see `src/hooks/useIpLocation.ts`) is fine and gives
travellers the right price. Checkout is the gatekeeper.

## Effort estimate

| Step | Effort |
|---|---|
| 1. Server-decided currency | ~half a day |
| 2. VPN/hosting → USD | ~2 hours |
| 3. Billing country match | ~2–3 hours |
| 4. Gateway settings | Config in Razorpay / Stripe dashboards |
| 5. Backend enforcement | Backend team |
