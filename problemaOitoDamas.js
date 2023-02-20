// <!--
// nome das imagens para preenchimento das casas
dama = "dama.bmp"; 
damaAmeacada = "damaAmeacada.bmp"; 
amarelo = "amarelo.bmp"; 
preto = "preto.bmp";

damas = new Array(); 

function inicializa() {
   n = 0; // quantidade de damas posicionadas no tabuleiro
   qtd_damas = obtemQtdDamas();
   imprime("mensagem", "");
   for (var i=0; i<qtd_damas; i++) {
      damas[i] = null;
   }
}

function montaTabuleiro(){
   inicializa();
   var texto = "<table>";
   for (var i=0; i<qtd_damas; i++){
      texto += "<tr>";
      for (var j=0; j<qtd_damas; j++){
         texto += "<td> <img id=a" + i + j + " src=" + obtemImagem("a"+ i + j) + " onClick=\"joga(id, true)\"></td>";  
      }
      texto += "</tr>";
   }
   texto += "</table>";
   imprime("tabuleiro", texto);
}

function joga(casa){
   livre(casa) ? fazLance(casa) : desfazLance(casa);
   var temAmeaca = sinalizaAmeacas();  
   imprime("mensagem", "");
   if ((n == qtd_damas) && (!temAmeaca)) {
	  imprime("mensagem", "Problema resolvido!");
   }
   return temAmeaca;
}

function fazLance(casa){
   if (n < qtd_damas) {     
      damas[n] = casa;
      n++;
   }
}

function desfazLance(casa){
   retiraDama(casa);
   damas[damas.indexOf(casa)] = damas[n-1];
   damas[n-1] = null;
   n--;
}

function sinalizaAmeacas(){
   var temAmeaca = false;    
   var atacada = [false, false, false, false, false, false, false, false];
   for (var i=0; i<n; i++){
      for (var j=0; j<n; j++){
         if ((i!=j) && (ameaca(damas[i], damas[j]))){
            atacada[i] = true;  temAmeaca = true;  break;
         }
      } 
      atacada[i] ? marcaCasa(damas[i], damaAmeacada) : marcaCasa(damas[i], dama); 
   }
   return temAmeaca;
}

function ameaca(damaA, damaB) {
   if (obtemDiagonal1(damaA) == obtemDiagonal1(damaB)) {
      return true;
   }
   if (obtemDiagonal2(damaA) == obtemDiagonal2(damaB)) {
      return true;
   }
   if (obtemLinha(damaA) == obtemLinha(damaB)) {
      return true;
   }
   if (obtemColuna(damaA) == obtemColuna(damaB)) {
      return true;
   }
   return false;
}

function resolve() {
   btnResolver.disabled=true;
   var colunas = new Array();
   for (var i=0; i<qtd_damas; i++) {
      colunas[i] = i;
   }
   do {
      reiniciaTabuleiro();
      colunas = embaralha(colunas);
      for (var i=0; i<qtd_damas; i++) {
         var erro = joga("a"+ i + colunas[i]);
         if (erro) { break; } 
      }
   } while (erro);
   btnResolver.disabled=false;
}

function reiniciaTabuleiro() {
   for (var i=0; i<n; i++) {
      retiraDama(damas[i]);
   }
   inicializa();
}

function embaralha(lista) {
   for (var i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
   }
   return lista;
}

function livre(casa){
   var imagem = obtemSrc(casa);
   if ((imagem == amarelo) || (imagem == preto)) {
      return true;
   }
   return false;
}

function retiraDama(casa) {
   marcaCasa(casa, obtemImagem(casa));
}

function marcaCasa(casa, imagem){
   document.getElementById(casa).src = imagem;
} 

function imprime (elemento, texto) {
   document.getElementById(elemento).innerHTML = texto;
}

function obtemSrc(casa){
   return document.getElementById(casa).getAttribute('src');
}

function obtemQtdDamas() {
   return document.getElementById("qtd_damas").value;
}

function obtemImagem(casa){
   var cor = obtemLinha(casa) + obtemColuna(casa);
   return (cor%2 == 0) ? amarelo : preto;
}

function obtemDiagonal1(casa){ 
   return (obtemLinha(casa) + obtemColuna(casa));
}

function obtemDiagonal2(casa){ 
   return (obtemLinha(casa) - obtemColuna(casa));
}

function obtemLinha(casa){ 
   return parseInt(casa.substring(1,2));
}
  
function obtemColuna(casa){ 
   return parseInt(casa.substring(2,3));
}

// -->