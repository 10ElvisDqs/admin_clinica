# admin_clinica — Frontend Angular 16
**Clínica Nuestra Señora del Rosario**

Panel de administración médica. Parte del proyecto **Citas Médicas App**.

> La guía completa de instalación y arquitectura está en `api-clinica/GUIA_PROYECTO.md`.

---

## Estructura esperada en disco

Este repositorio debe estar al lado de `api-clinica/` en la misma carpeta padre:

```
carpeta-padre/
├── api-clinica/      ← backend Laravel + docker-compose.yml
└── admin_clinica/    ← este repo
```

## Desarrollo local (sin Docker)

```bash
npm install
npm start        # servidor en http://192.168.100.9:4200
```

Asegúrate de que `src/environments/environment.development.ts` apunte al backend:
```typescript
URL_SERVICIOS: 'http://127.0.0.1:8000/api'
```

## Build de producción

```bash
npm run build    # genera dist/preclinic-angular/
```

El build de producción lo hace automáticamente Docker al levantar el proyecto desde `api-clinica/`.

## Correr el proyecto completo (Docker)

```bash
cd ../api-clinica
docker-compose up -d --build
```

Ver `api-clinica/GUIA_PROYECTO.md` para instrucciones detalladas.
