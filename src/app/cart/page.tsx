"use client";
import { useCart } from "../CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

// Sale Config (matching home page)
const SALE_RECORDED_PRICE = 7500;
const SALE_LIVE_PRICE = 15000;
const ORIGINAL_RECORDED_PRICE = 12000;
const ORIGINAL_LIVE_PRICE = 20000;

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const [copied, setCopied] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration
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
        const delivery = i.courseType === "recorded" ? "📹 Recorded — access within 3 days" : "🔴 Live — starts within 1–2 days";
        msg += `• ${i.name} — Rs. ${i.price.toLocaleString()}\n  ${delivery}\n`;
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
      <div style={{
        background: "#ffffff", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "56px", marginBottom: "20px" }}>🛒</div>
          <h2 style={{ color: "#1e1a14", fontSize: "26px", fontWeight: 800, marginBottom: "10px" }}>Your cart is empty</h2>
          <p style={{ color: "#888", marginBottom: "28px", fontSize: "15px" }}>Add some services or courses to get started!</p>
          <Link href="/#services" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#d45113", color: "#ffffff",
            borderRadius: "12px", padding: "13px 28px",
            fontSize: "14px", fontWeight: 700, textDecoration: "none",
          }}>
            Browse Services →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#ffffff", minHeight: "100vh", padding: "40px 24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #ffffff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 3px; }

        .cart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .cart-panel { background: #ffffff; border: 1px solid #eee; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.02); }
        .cart-panel-header { padding: 20px 24px; border-bottom: 1px solid #f0f0f0; }
        .cart-panel-title { color: #1e1a14; font-weight: 700; font-size: 15px; }
        .cart-item { padding: 18px 24px; border-bottom: 1px solid #f5f5f5; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .cart-item:last-child { border-bottom: none; }
        .badge-service { font-size: 10px; font-weight: 700; letter-spacing: .07em; padding: 2px 8px; border-radius: 100px; background: rgba(212,81,19,.08); color: #d45113; border: 1px solid rgba(212,81,19,.2); }
        .badge-course { font-size: 10px; font-weight: 700; letter-spacing: .07em; padding: 2px 8px; border-radius: 100px; background: rgba(100,140,255,.08); color: #4a6aff; border: 1px solid rgba(100,140,255,.2); }
        .item-name { color: #1e1a14; font-size: 14px; font-weight: 600; }
        .item-desc { color: #888; font-size: 12px; margin-bottom: 4px; }
        .item-delivery-service { color: #d45113; font-size: 11px; }
        .item-delivery-course { color: #4a6aff; font-size: 11px; }
        .item-price { color: #d45113; font-weight: 700; font-size: 15px; }
        .item-price-sub { color: #aaa; font-size: 11px; }
        .btn-remove { background: none; border: none; color: #ccc; cursor: pointer; font-size: 18px; margin-top: 4px; transition: color .2s; }
        .btn-remove:hover { color: #ff6b6b; }
        .btn-clear { width: 100%; margin-top: 10px; padding: 11px; background: transparent; border: 1px solid #ffcccc; border-radius: 12px; color: #ff6b6b; font-size: 13px; cursor: pointer; transition: background .2s; }
        .btn-clear:hover { background: rgba(255,100,100,.05); }

        .amount-box { background: rgba(212,81,19,.04); border: 1px solid rgba(212,81,19,.15); border-radius: 20px; padding: 24px; }
        .amount-label { color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 16px; }
        .amount-row { display: flex; justify-content: space-between; color: #666; font-size: 13px; margin-bottom: 8px; }
        .amount-gold { color: #d45113; }
        .amount-blue { color: #4a6aff; }
        .amount-total { color: #d45113; font-size: 36px; font-weight: 900; text-align: center; }
        .amount-later { color: #aaa; font-size: 12px; margin-top: 6px; text-align: center; }

        .bank-box { background: #ffffff; border: 1px solid #eee; border-radius: 20px; padding: 24px; box-shadow: 0 2px 6px rgba(0,0,0,.02); }
        .bank-title { color: #d45113; font-weight: 700; margin-bottom: 16px; font-size: 14px; }
        .bank-row { background: #fefcf8; border-radius: 10px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #f5f0ea; }
        .bank-row:last-child { margin-bottom: 0; }
        .bank-row-label { color: #aaa; font-size: 11px; margin-bottom: 2px; }
        .bank-row-val { color: #1e1a14; font-weight: 600; font-size: 15px; }
        .bank-row-val.mono { font-family: monospace; }
        .btn-copy { background: rgba(212,81,19,.08); border: 1px solid rgba(212,81,19,.2); border-radius: 8px; padding: 6px 12px; cursor: pointer; color: #d45113; font-size: 12px; font-weight: 600; }

        .instructions-box { background: rgba(74,106,255,.04); border: 1px solid rgba(74,106,255,.15); border-radius: 16px; padding: 18px; }
        .instructions-title { color: #4a6aff; font-weight: 700; margin-bottom: 10px; font-size: 13px; }
        .instructions-step { display: flex; gap: 10px; color: #888; font-size: 12px; margin-bottom: 6px; }
        .step-num { color: #d45113; font-weight: 700; flex-shrink: 0; }
        .instructions-note { color: #aaa; font-size: 11px; margin-top: 10px; font-style: italic; }

        .btn-wa { display: flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; color: #fff; border: none; border-radius: 14px; padding: 16px; font-size: 15px; font-weight: 700; text-decoration: none; cursor: pointer; transition: opacity .2s; }
        .btn-wa:hover { opacity: .85; }
        .wa-number { text-align: center; margin-top: 8px; }
        .wa-number p { color: #aaa; font-size: 12px; margin-bottom: 4px; }
        .wa-number-val { display: flex; align-items: center; justify-content: center; gap: 8px; }
        .wa-number-text { color: #25D366; font-weight: 700; font-size: 15px; }
        .btn-copy-small { background: none; border: none; color: #aaa; cursor: pointer; font-size: 12px; font-weight: 600; }
        .btn-copy-small:hover { color: #d45113; }

        .sale-notice { background: linear-gradient(90deg,#fff0e0,#ffe8d4,#fff0e0); border: 1px solid #f0c48b; border-radius: 12px; padding: 12px 20px; margin-bottom: 24px; text-align: center; }
        .sale-notice-text { color: #d45113; font-size: 13px; font-weight: 600; }
        .sale-notice-text span { font-weight: 800; }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back */}
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#aaa", fontSize: "14px", textDecoration: "none", marginBottom: "24px",
          transition: "color .2s",
        }}>
          ← Back to Home
        </Link>

        {/* Summer Sale Notice */}
        <div className="sale-notice">
          <div className="sale-notice-text">
            🔥 <span>SUMMER SALE!</span> Recorded: Rs. {SALE_RECORDED_PRICE.toLocaleString()} (was Rs. {ORIGINAL_RECORDED_PRICE.toLocaleString()}) · 
            Live: Rs. {SALE_LIVE_PRICE.toLocaleString()} (was Rs. {ORIGINAL_LIVE_PRICE.toLocaleString()})
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          color: "#1e1a14", fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 800, marginBottom: "6px", letterSpacing: "-.02em",
        }}>Checkout</h1>
        <p style={{ color: "#aaa", marginBottom: "40px", fontSize: "14px" }}>
          {hasService && hasCourse
            ? "Services: 50% advance · Courses: 100% upfront"
            : hasCourse
            ? "Full payment required for course access"
            : "Complete your order with 50% advance payment"}
        </p>

        <div className="cart-grid">

          {/* LEFT: Items */}
          <div>
            <div className="cart-panel">
              <div className="cart-panel-header">
                <span className="cart-panel-title">Your Items ({items.length})</span>
              </div>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span className={item.type === "service" ? "badge-service" : "badge-course"}>
                        {item.type === "service" ? "SERVICE" : "COURSE"}
                      </span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <p className="item-desc">{item.description}</p>
                    {item.type === "service" ? (
                      <p className="item-delivery-service">💼 50% now · 50% after completion</p>
                    ) : item.courseType === "recorded" ? (
                      <p className="item-delivery-course">📹 Recorded · access within 3 days</p>
                    ) : (
                      <p className="item-delivery-course">🔴 Live · starts within 1–2 days</p>
                    )}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="item-price">Rs. {item.price.toLocaleString()}</div>
                    {item.type === "service" && (
                      <div className="item-price-sub">50%: Rs. {Math.floor(item.price / 2).toLocaleString()}</div>
                    )}
                    <button onClick={() => removeItem(item.id)} className="btn-remove">🗑</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={clearCart} className="btn-clear">Clear Cart</button>
          </div>

          {/* RIGHT: Payment */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Amount */}
            <div className="amount-box">
              <p className="amount-label">Amount to Pay Now</p>
              {hasService && (
                <div className="amount-row">
                  <span>💼 Services (50% advance)</span>
                  <span className="amount-gold">Rs. {Math.floor(serviceTotal / 2).toLocaleString()}</span>
                </div>
              )}
              {hasCourse && (
                <div className="amount-row">
                  <span>📚 Courses (full)</span>
                  <span className="amount-blue">Rs. {courseTotal.toLocaleString()}</span>
                </div>
              )}
              <div style={{ borderTop: "1px solid rgba(212,81,19,.1)", paddingTop: "16px", marginTop: "8px" }}>
                <div className="amount-total">Rs. {amountDueNow.toLocaleString()}</div>
                {amountDueLater > 0 && (
                  <p className="amount-later">Due after completion: Rs. {amountDueLater.toLocaleString()}</p>
                )}
              </div>
            </div>

            {/* Bank */}
            <div className="bank-box">
              <p className="bank-title">🏦 Bank Account Details</p>
              {[
                { label: "Bank", value: "SadaPay", key: null },
                { label: "Account Title", value: "Shazia", key: null },
                { label: "Account Number", value: "03133937654", key: "account" },
              ].map(row => (
                <div key={row.label} className="bank-row">
                  <div>
                    <div className="bank-row-label">{row.label}</div>
                    <div className={`bank-row-val${row.key ? " mono" : ""}`}>{row.value}</div>
                  </div>
                  {row.key && (
                    <button onClick={() => copy(row.value, row.key!)} className="btn-copy">
                      {copied === row.key ? "✓ Copied" : "Copy"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="instructions-box">
              <p className="instructions-title">📋 How to Order</p>
              {[
                `Transfer Rs. ${amountDueNow.toLocaleString()} to SadaPay above`,
                `Click "Send Order on WhatsApp" below`,
                `Attach payment screenshot on +92 336 8952826`,
                hasCourse ? `📹 Recorded access: within 3 days · 🔴 Live: starts in 1–2 days` : null,
                hasService ? `Work starts immediately after confirmation` : null,
                hasService ? `Pay remaining 50% after project completion` : null,
              ].filter(Boolean).map((step, i) => (
                <div key={i} className="instructions-step">
                  <span className="step-num">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <p className="instructions-note">
                ⚠️ Platform accounts (n8n, VAPI, hosting, domains) are provided by client.
              </p>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/923368952826?text=${getWhatsAppMessage()}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-wa"
            >
              💬 Send Order on WhatsApp
            </a>

            <div className="wa-number">
              <p>Send payment screenshot to</p>
              <div className="wa-number-val">
                <span className="wa-number-text">+92 336 8952826</span>
                <button onClick={() => copy("923368952826", "wa")} className="btn-copy-small">
                  {copied === "wa" ? "✓ Copied" : "Copy"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
