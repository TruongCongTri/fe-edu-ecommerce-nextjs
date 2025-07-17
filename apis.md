| Route / Function                           | Recommended Fetch                      |
| ------------------------------------------ | -------------------------------------- |
| `/api/skills`, `/api/skills/:slug`         | Server-side                            |
| `/api/categories`, `/api/categories/:slug` | Server-side                            |
| `/api/products`, `/api/products/:slug`     | Server-side                            |
| `/api/users/me/profile`                    | Server-side (protected route prefetch) |
| `/api/auth/login`                          | Client-side (form)                     |
| `/api/auth/register`                       | Client-side (form)                     |
| `/api/auth/change-password`                | Client-side (form)                     |
| `/api/users/me/view-history`               | Client-side (personalized feature)     |
| `/api/users/me/favorite`                   | Client-side                            |
| Educator CRUD (/educator/products)         | Client-side                            |
| Admin routes                               | Client-side (admin dashboard)          |
