# CityBank

Estrutura do sistema:

- backend/ (Spring Boot)
- frontend-cliente/ (React para cliente)
- frontend-admin/ (React para admin)

Todos os frontends consomem a API centralizada do backend.

## Deploy

- Backend no Render: use `backend` como Root Directory.
- Frontend Cliente no Vercel: use `frontend-cliente` como Root Directory.
- Frontend Admin no Vercel: use `frontend-admin` como Root Directory.
- Configure `VITE_API_BASE_URL` nos frontends com a URL publica do backend, incluindo o contexto `/api`.

## Padrão de Componentes (Frontend)
Cada componente deve estar em sua própria pasta, com index.js e styles.css.

## Responsividade
Utilize media queries e componentes específicos para navegação mobile.

## Integração
Utilize Axios ou Fetch para consumir a API REST do backend.
