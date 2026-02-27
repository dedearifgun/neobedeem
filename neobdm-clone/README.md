# NeoBDM Website Clone

This is a static clone of [neobdm.tech](https://neobdm.tech/) - a stock analysis and screening tool for Indonesian stocks.

## Structure

```
neobdm-clone/
└── neobdm.tech/
    ├── index.html                    # Landing page (public)
    ├── home/index.html               # Dashboard home (authenticated)
    ├── accounts/
    │   ├── login/index.html          # Login page
    │   ├── signup/index.html         # Sign up page
    │   └── password/reset/index.html # Password reset
    ├── balance_position_chart/       # Balance & position chart
    ├── broker_stalker/               # Broker stalker tool
    ├── broker_summary/               # Broker summary
    ├── calculator/                   # Money management calculator
    ├── clip/                         # Video clips
    ├── coming_soon/                  # Coming soon page
    ├── dashboard/screener/           # Stock screener
    ├── done_detail/                  # Done detail
    ├── evaluation/list.html          # Evaluation list
    ├── faq/                          # FAQ page
    ├── inventory/                    # Inventory
    ├── livestream/                   # Livestream page
    ├── market_summary/               # Market summary
    ├── payments/history/             # Payment history
    ├── qna/list.html                 # Q&A list
    ├── rotation_chart/               # Rotation chart
    ├── seasonality_table/            # Seasonality table
    ├── sector_activity/              # Sector activity
    ├── subscription/                 # Subscription plans
    ├── transaction_chart/            # Transaction chart
    ├── tutorial/                     # Tutorial page
    ├── users/profile/                # User profile
    ├── watchlist/                    # Watchlist
    └── static/                       # All static assets (CSS, JS, images, fonts)
```

## Notes

- This is a **static snapshot** of the website. Dynamic features (API calls, real-time data) will not work without the backend server.
- The HTML files have been converted to use relative links for local browsing.
- To browse locally, open `neobdm.tech/index.html` in a web browser.

## Cloned on

2026-02-27
