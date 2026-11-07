# Portfólio pessoal — CP3

Site estático em HTML, CSS e JavaScript, com cinco páginas conectadas, formulário com validação acessível e favoritos persistidos em `localStorage`.

## Antes de publicar

O nome, curso e cidade informados já foram preenchidos. Os campos entre colchetes ainda precisam ser substituídos pelos dados reais de formação, experiência e projetos. Os cartões de projetos são exemplos: personalize seus títulos e descrições. Atualize também as habilidades e os dados ilustrativos de [graficos.html](graficos.html); não publique exemplos fictícios como se fossem reais. A página Multimídia usa uma composição animada feita em CSS, sem arquivos de mídia externos.

O formulário é demonstrativo: valida os campos no navegador, mas não envia nem armazena mensagens. Para receber mensagens, conecte-o a um serviço de formulários ou backend antes de divulgar o site.

## Visualizar localmente

Abra `index.html` no navegador. Todas as páginas são arquivos estáticos e não precisam de dependências ou etapa de build.

## Publicar no GitHub Pages

1. Crie um repositório público no GitHub e envie estes arquivos para a branch `main`.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, escolha `main` e a pasta `/ (root)`, e salve.
4. Aguarde a publicação indicada na página de configurações. O endereço `https://<usuario>.github.io/<repositorio>/` e os caminhos relativos entre páginas devem funcionar em HTTPS.
5. Teste os cinco caminhos (`index.html`, `curriculo.html`, `formulario.html`, `multimidia.html` e `graficos.html`) e a navegação em uma janela anônima.
6. Depois de revisar a entrega, crie a tag solicitada:

   ```sh
   git tag -a cp3-entrega -m "Entrega CP3"
   git push origin cp3-entrega
   ```

Os commits devem descrever as alterações realizadas; por exemplo, `feat: criar páginas do portfólio` e `feat: adicionar favoritos persistentes e validação`.
