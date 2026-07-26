"use client";
import { useCart } from "../CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

// Sale Config
const SALE_RECORDED_PRICE = 7499;
const ORIGINAL_RECORDED_PRICE = 12000;

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const [copied, setCopied] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasService = items.some(i => i.type === "service");
  const hasCourse = items.some(i => i.type === "course");
  const serviceTotal = items.filter(i => i.type === "service").reduce((s, i) => s + i.price, 0);
  const courseTotal = items.filter(i => i.type === "course").reduce((s, i) => s + i.price, 0);
  const amountDueNow = Math.floor(serviceTotal / 2) + courseTotal;
  const amountDueLater = Math.floor(serviceTotal / 2);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const getWhatsAppMessage = () => {
    const courseItems = items.filter(i => i.type === "course");
    const serviceItems = items.filter(i => i.type === "service");

    let msg = `🛒 *New Order*\n━━━━━━━━━━━━━━━\n`;
    if (courseItems.length > 0) {
      msg += `\n📚 *Courses (100% Upfront):*\n`;
      courseItems.forEach(i => {
        msg += `• ${i.name} — Rs. ${i.price.toLocaleString()}\n  📹 Recorded — access within 3 days\n`;
      });
    }
    if (serviceItems.length > 0) {
      msg += `\n💼 *Services (50% Advance):*\n`;
      serviceItems.forEach(i => {
        msg += `• ${i.name} — Rs. ${i.price.toLocaleString()} (Advance: Rs. ${Math.floor(i.price / 2).toLocaleString()})\n`;
      });
    }
    msg += `\n━━━━━━━━━━━━━━━\n`;
    if (hasCourse) msg += `📚 Course Amount: Rs. ${courseTotal.toLocaleString()}\n`;
    if (hasService) msg += `💼 Service Advance (50%): Rs. ${Math.floor(serviceTotal / 2).toLocaleString()}\n`;
    msg += `\n💰 *Paying Now: Rs. ${amountDueNow.toLocaleString()}*\n`;
    if (amountDueLater > 0) msg += `🔜 Due After Completion: Rs. ${amountDueLater.toLocaleString()}\n`;
    msg += `\n📎 *[Payment screenshot attached]*`;
    return encodeURIComponent(msg);
  };

  if (!isMounted) return null;

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <style>{`
          .empty-state {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fafaf8;
            padding: 40px 24px;
            font-family: 'Inter', -apple-system, sans-serif;
          }
          .empty-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 60px 48px;
            text-align: center;
            max-width: 480px;
            box-shadow: 0 2px 40px rgba(0,0,0,.04);
            border: 1px solid #e8e6df;
          }
          .empty-icon { font-size: 72px; display: block; margin-bottom: 24px; }
          .empty-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #1a1b1e;
            margin-bottom: 12px;
          }
          .empty-desc {
            color: #8a8d96;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 32px;
          }
          .empty-btn {
            display: inline-block;
            padding: 14px 40px;
            background: linear-gradient(135deg, #c9771e, #e8993e);
            color: #fff;
            border-radius: 100px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
            transition: all .3s cubic-bezier(.16,1,.3,1);
            box-shadow: 0 4px 20px rgba(201,119,30,.25);
          }
          .empty-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 32px rgba(201,119,30,.35);
          }
          @media(max-width:480px){ .empty-card { padding: 40px 24px; } }
        `}</style>
        <div className="empty-card">
          <span className="empty-icon">🛒</span>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-desc">Add some services or courses to get started!</p>
          <Link href="/#services" className="empty-btn">Browse Services →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .cart-wrapper {
          --accent: #c9771e;
          --accent-light: #e8993e;
          --accent-soft: rgba(201,119,30,.08);
          --bg: #fafaf8;
          --card: #ffffff;
          --border: #e8e6df;
          --border-soft: #f0efe9;
          --text: #1a1b1e;
          --text-dim: #5a5d66;
          --text-faint: #8a8d96;
          --teal: #0d9488;
          --danger: #dc2626;

          min-height: 100vh;
          background: var(--bg);
          padding: 40px 24px 60px;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        .cart-wrapper * { box-sizing: border-box; margin: 0; padding: 0; }
        .cart-wrapper .mono { font-family: 'JetBrains Mono', monospace; }

        .cart-container { max-width: 1080px; margin: 0 auto; }

        /* ─── HEADER ─── */
        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .cart-header-left { display: flex; align-items: center; gap: 18px; }
        .cart-back {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-faint);
          font-size: 14px;
          text-decoration: none;
          padding: 6px 4px;
          transition: color .2s;
        }
        .cart-back:hover { color: var(--accent); }
        .cart-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -.01em;
        }
        .cart-title span {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cart-badge {
          color: var(--text-faint);
          font-size: 13px;
          font-weight: 600;
        }
        .cart-badge b { color: var(--accent); }

        /* ─── MAIN GRID (no outer boxes, generous whitespace instead) ─── */
        .cart-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: start;
        }
        @media(max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* ─── ITEMS (flat list, not a boxed card) ─── */
        .items-section-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 4px;
          padding-bottom: 14px;
          border-bottom: 2px solid var(--text);
        }
        .items-section-heading h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 700;
        }
        .items-count { color: var(--text-faint); font-size: 13px; }

        .cart-item {
          padding: 20px 0;
          border-bottom: 1px solid var(--border-soft);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: start;
        }

        .item-type-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 3px 0;
          width: 64px;
          text-align: center;
          border-radius: 5px;
        }
        .item-type-tag.service { color: var(--accent); background: var(--accent-soft); }
        .item-type-tag.course { color: var(--teal); background: rgba(13,148,136,.08); }

        .item-info { min-width: 0; }
        .item-name {
          font-weight: 600;
          font-size: 15px;
          color: var(--text);
          display: block;
        }
        .item-desc {
          color: var(--text-dim);
          font-size: 12.5px;
          margin-top: 3px;
          line-height: 1.5;
        }
        .item-meta {
          font-size: 11.5px;
          font-weight: 500;
          margin-top: 6px;
        }
        .item-meta.service { color: var(--accent); }
        .item-meta.course { color: var(--teal); }

        .item-right {
          text-align: right;
        }
        .item-price {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          white-space: nowrap;
        }
        .item-price-sub {
          font-size: 11px;
          color: var(--text-faint);
          margin-top: 2px;
        }
        .btn-remove {
          background: none;
          border: none;
          color: var(--text-faint);
          font-size: 12px;
          cursor: pointer;
          padding: 6px 0 0;
          transition: color .2s;
        }
        .btn-remove:hover { color: var(--danger); }

        .clear-btn {
          margin-top: 16px;
          background: none;
          border: none;
          color: var(--text-faint);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 0;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color .2s;
        }
        .clear-btn:hover { color: var(--danger); }

        /* ─── RIGHT COLUMN: one continuous panel instead of stacked boxes ─── */
        .right-column {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        @media(min-width: 901px) {
          .right-column { position: sticky; top: 24px; }
        }

        .panel-block + .panel-block {
          padding-top: 22px;
          border-top: 1px solid var(--border-soft);
        }

        .panel-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: var(--text-faint);
          margin-bottom: 14px;
        }

        .amount-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 14px;
          color: var(--text-dim);
        }
        .amount-row .highlight { color: var(--accent); font-weight: 600; }
        .amount-row .highlight-teal { color: var(--teal); font-weight: 600; }

        .amount-total {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px dashed var(--border);
        }
        .amount-total-label {
          font-size: 13px;
          color: var(--text-dim);
          font-weight: 600;
        }
        .amount-total-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: var(--accent);
        }
        .amount-total-sub {
          font-size: 12px;
          color: var(--text-faint);
          margin-top: 4px;
          text-align: right;
        }

        /* ─── BANK DETAILS (rows, no nested box) ─── */
        .bank-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 9px 0;
        }
        .bank-label {
          font-size: 13px;
          color: var(--text-dim);
          font-weight: 500;
        }
        .bank-value-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bank-value {
          font-weight: 600;
          font-size: 14px;
          color: var(--text);
        }
        .bank-value.mono { font-family: 'JetBrains Mono', monospace; }
        .btn-copy {
          padding: 4px 12px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-dim);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          white-space: nowrap;
        }
        .btn-copy:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .btn-copy.copied {
          background: var(--teal);
          color: #fff;
          border-color: var(--teal);
        }

        /* ─── INSTRUCTIONS (left accent rule, no boxed background) ─── */
        .instructions {
          border-left: 3px solid var(--teal);
          padding-left: 16px;
        }
        .instructions-title {
          color: var(--teal);
          font-weight: 700;
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: .04em;
          margin-bottom: 10px;
        }
        .instruction-step {
          display: flex;
          gap: 8px;
          color: var(--text-dim);
          font-size: 12.5px;
          line-height: 1.6;
          margin-bottom: 5px;
        }
        .instruction-step:last-child { margin-bottom: 0; }
        .step-num {
          color: var(--teal);
          font-weight: 700;
          flex-shrink: 0;
        }
        .instructions-note {
          margin-top: 10px;
          color: var(--text-faint);
          font-size: 11px;
          font-style: italic;
        }

        /* ─── REFUND (accent rule only, matches instructions style) ─── */
        .refund-notice {
          border-left: 3px solid var(--danger);
          padding-left: 16px;
        }
        .refund-notice-title {
          color: var(--danger);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .04em;
          margin-bottom: 5px;
        }
        .refund-notice-text {
          color: var(--text-dim);
          font-size: 12px;
          line-height: 1.6;
        }

        /* ─── WHATSAPP CTA ─── */
        .wa-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 28px;
          background: #25D366;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: all .25s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 6px 24px rgba(37,211,102,.28);
        }
        .wa-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(37,211,102,.38);
        }
        .wa-number-row {
          text-align: center;
        }
        .wa-number-row p {
          color: var(--text-faint);
          font-size: 12px;
          margin-bottom: 4px;
        }
        .wa-number-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .wa-number {
          color: #25D366;
          font-weight: 700;
          font-size: 15px;
        }
        .btn-copy-small {
          background: none;
          border: none;
          color: var(--text-faint);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
          transition: color .2s;
        }
        .btn-copy-small:hover { color: var(--accent); }

        /* ─── RESPONSIVE ─── */
        @media(max-width: 600px) {
          .cart-wrapper { padding: 24px 16px 100px; }
          .cart-header { gap: 8px; }
          .cart-title { font-size: 26px; }
          .cart-item {
            grid-template-columns: auto 1fr;
            row-gap: 8px;
          }
          .item-right {
            grid-column: 1 / -1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            margin-top: 2px;
          }
          .item-price-sub { margin-top: 0; }
          .right-column { padding: 20px; border-radius: 16px; gap: 18px; }
          .amount-total-number { font-size: 26px; }
          .bank-row { flex-wrap: wrap; gap: 6px; }
          .bank-value-wrapper { flex-wrap: wrap; }
        }
      `}</style>

      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-left">
            <Link href="/" className="cart-back">← Back</Link>
            <h1 className="cart-title"><span>Checkout</span></h1>
          </div>
          <span className="cart-badge"><b>{items.length}</b> item{items.length > 1 ? "s" : ""} in cart</span>
        </div>

        {/* Main Grid */}
        <div className="cart-grid">
          {/* Left: Items */}
          <div>
            <div className="items-section-heading">
              <h3>Your Items</h3>
              <span className="items-count">{items.length} items</span>
            </div>

            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <span className={`item-type-tag ${item.type}`}>
                  {item.type === "service" ? "Service" : "Course"}
                </span>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <div className="item-desc">{item.description}</div>
                  <div className={`item-meta ${item.type}`}>
                    {item.type === "service"
                      ? "50% advance · 50% after completion"
                      : "Recorded · access within 3 days"
                    }
                  </div>
                </div>
                <div className="item-right">
                  <div className="item-price">Rs. {item.price.toLocaleString()}</div>
                  {item.type === "service" && (
                    <div className="item-price-sub">50%: Rs. {Math.floor(item.price / 2).toLocaleString()}</div>
                  )}
                  <button onClick={() => removeItem(item.id)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="clear-btn">Clear Cart</button>
          </div>

          {/* Right Column — single unified panel */}
          <div className="right-column">
            {/* Payment Summary */}
            <div className="panel-block">
              <div className="panel-title">Payment Summary</div>

              {hasService && (
                <div className="amount-row">
                  <span>Services (50% advance)</span>
                  <span className="highlight">Rs. {Math.floor(serviceTotal / 2).toLocaleString()}</span>
                </div>
              )}
              {hasCourse && (
                <div className="amount-row">
                  <span>Courses (full)</span>
                  <span className="highlight-teal">Rs. {courseTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="amount-total">
                <div>
                  <div className="amount-total-label">Pay now</div>
                  {amountDueLater > 0 && (
                    <div className="amount-total-sub">Due after completion: Rs. {amountDueLater.toLocaleString()}</div>
                  )}
                </div>
                <div className="amount-total-number">Rs. {amountDueNow.toLocaleString()}</div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="panel-block">
              <div className="panel-title">Bank Details</div>

              <div className="bank-row">
                <span className="bank-label">Bank</span>
                <div className="bank-value-wrapper">
                  <span className="bank-value">SadaPay</span>
                </div>
              </div>

              <div className="bank-row">
                <span className="bank-label">Account Title</span>
                <div className="bank-value-wrapper">
                  <span className="bank-value">Shazia</span>
                </div>
              </div>

              <div className="bank-row">
                <span className="bank-label">Account Number</span>
                <div className="bank-value-wrapper">
                  <span className="bank-value mono">03133937654</span>
                  <button
                    onClick={() => copy("03133937654", "account")}
                    className={`btn-copy ${copied === "account" ? "copied" : ""}`}
                  >
                    {copied === "account" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="panel-block">
              <div className="instructions">
                <div className="instructions-title">How to Order</div>
                {[
                  `Transfer Rs. ${amountDueNow.toLocaleString()} to SadaPay`,
                  `Click "Send Order on WhatsApp" below`,
                  `Attach payment screenshot`,
                  hasCourse && `Course access given immediately`,
                  hasService && `Work starts immediately after confirmation`,
                  hasService && `Pay remaining 50% after completion`,
                ].filter(Boolean).map((step, i) => (
                  <div key={i} className="instruction-step">
                    <span className="step-num">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
                <div className="instructions-note">
                  Platform accounts (n8n, hosting, domains) are provided by client.
                </div>
              </div>
            </div>

            {/* Refund */}
            {hasCourse && (
              <div className="panel-block">
                <div className="refund-notice">
                  <div className="refund-notice-title">No Refund Policy</div>
                  <div className="refund-notice-text">
                    Course purchase karne ke baad koi refund nahi diya jayega. Enroll karne se pehle course outline zaroor dekh lein.
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp */}
            <div className="panel-block">
              <a
                href={`https://wa.me/923182082758?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-button"
              >
                💬 Send Order on WhatsApp
              </a>

              <div className="wa-number-row" style={{ marginTop: 12 }}>
                <p>Send payment screenshot to</p>
                <div className="wa-number-display">
                  <span className="wa-number">+92 318 2082758</span>
                  <button
                    onClick={() => copy("923182082758", "wa")}
                    className="btn-copy-small"
                  >
                    {copied === "wa" ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
