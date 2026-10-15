# CineTrack

Gerenciador pessoal de filmes desenvolvido para a disciplina de Programação de Sistemas Web da UEM, com HTML, CSS e JavaScript puro.

## Executar

Na raiz do repositório, execute:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000/parte1/` no navegador.

## Uso

- Cadastre filmes pelo botão **+ Adicionar** ou pelo link **Adicionar filme** no rodapé da página principal.
- Edite ou remova um filme pelos botões do card. A remoção pede confirmação.
- Combine a busca por título com os filtros de status. A busca é atualizada após uma pausa de 300 ms.
- Feche o formulário com **Cancelar** ou **Esc**. O formulário também pode ser utilizado pelo teclado.
- Os dados são salvos no navegador com a chave `cinetrack:filmes` do localStorage. Na primeira visita, são exibidos seis filmes de exemplo.
- O tema acompanha a preferência clara/escura do sistema.

O código da Parte 1 está em `parte1/`, com a lógica concentrada em `app.js`. A tag `v1.0` identifica esta entrega.

## Autoria

Nome(s) e RA(s): a preencher.
