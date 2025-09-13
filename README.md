# Carbono & Experiencia - Web3 DApp

Una aplicación descentralizada para comercializar tokens de carbono y mintear NFTs de experiencias únicas.

## 🚀 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de la red
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org

# Direcciones de los contratos inteligentes
NEXT_PUBLIC_CARBONO=0x[DIRECCION_DEL_CONTRATO_CARBONO]
NEXT_PUBLIC_EXPERIENCIA=0x[DIRECCION_DEL_CONTRATO_EXPERIENCIA]
```

### Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Funcionalidades

- **Compra de tokens CBO** con ETH
- **Minteo de NFTs de Experiencia** con tokens CBO
- **Panel de administración** para propietarios de contratos
- **Conexión de wallet** con RainbowKit
- **Notificaciones** de transacciones

## 📝 Notas Importantes

- Los contratos inteligentes deben estar desplegados en la red especificada
- Las direcciones de los contratos deben ser válidas y estar configuradas
- La aplicación está configurada para Sepolia por defecto

## 🛠️ Desarrollo

Esta aplicación usa:
- Next.js 15
- React 19
- Wagmi para interacción con Web3
- RainbowKit para conexión de wallets
- Tailwind CSS para estilos
