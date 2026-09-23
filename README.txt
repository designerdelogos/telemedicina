CONSULTE JÁ TELEMEDICINA — Landing Page

ARQUIVOS
- index.html
- style.css
- script.js
- assets/images/

COMO VISUALIZAR
1. Extraia o ZIP.
2. Abra o arquivo index.html no navegador.
3. Não é necessário servidor local para visualizar a página.

CHECKOUT / PAGAMENTOS
No arquivo script.js existe o objeto PAYMENT_LINKS:

const PAYMENT_LINKS = {
  essencial: "",
  completo: "",
  familia: ""
};

Cole ali os links de assinatura do Stripe, Asaas, Mercado Pago ou outro gateway.
Enquanto os links estiverem vazios, os botões direcionam para o WhatsApp em modo de demonstração.

IMPORTANTE
Os benefícios, preços e afirmações comerciais foram organizados a partir do material fornecido.
Antes de publicar, valide com o cliente os termos finais dos planos, cobertura, carência, limite de consultas, regras de idade e condições de emissão de documentos médicos.
