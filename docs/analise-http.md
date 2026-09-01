1. Primeira requisição:
    GET https://developer.mozilla.org/pt-BR/ `304`
2. Requisições de recusos estáticos (CSS, JS e uma Imagem):
    - GET https://developer.mozilla.org/static/client/styles-global.edd46645a22dfb0f.css `200 content-type: text/css`
    - GET https://developer.mozilla.org/static/client/runtime.7d6ffb41b253875f.js `200 content-type: text/javascript`
    - GET https://developer.mozilla.org/static/ssr/mdn_contributor.9e2a105f50828d5a.png `200 content-type: image/png` 
3. Force um 404:
    Na aba network de devtools é possível ver que existe um documento que recebeu um 404 do servidor.
4. Requisições dinâmicas:
    - GET `path: /videogoodput?id=o-AC3mrOUsPN5Lqz9IfCYPL2T3aDB2ktuJDECVkJ7iPVEi&source=goodput&range=0-4999&expire=1788129895&ip=2804:14d:1a86:ce00::1e85&ms=pm&mm=35&pl=54&sparams=id,source,range,expire,ip,ms,mm,pl&signature=777786CA1A2EC201968827BC9AF37A9C0B3C8914.0E3FE363706BAB553EAB8CDB704A6A7AF0888E67&key=cms1&cpn=i5FOizj9aGSKYUcg` `200`
5. O que o CineTrack utilizará para listar os filmes:
    Utilizará o método `GET` para listar os filmes e a resposta será um `application/json; charset=UTF-8`. Pode ser utilizado o path `/listar-filmes` para essa requisição.


