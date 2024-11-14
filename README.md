# Traductor de Memoria y Gestor
## Ejecucion del programa
Sera necesario contar con Node.js `v22` 

```bash
git clone ..
cd ./memory-manager-emulation
npm install
npm run dev
```
## Que se debe realizar?
Inicialmente el programa debera leer el tamano de pagina, el tamano de la memoria virtual, el tamano de la memoria fisica, el nümero de paginas que tiene el proceso y la lista de referencias para un solo proceso. La tabla de paginas se ira construyendo conforme se vayan generando los fallos de pagina. El direccionamiento sera por `bytes`.
Una vez leidos los datos, el programa debera esperar la lectura de cualquier caracter o enter. Cada Vez que se lleve a cabo una lectura, eI programa leera eI estado de los bits de control _(excepto el de presente/ausente)_ y hara referencia a la siguiente pagina de la lista de referencias leida. Se debera desplegar en pantalla los valores de la tabla de paginas _(valor en decimal, hexadecimal y binario)_, después el valor de la direccion virtual a la que se esta haciendo referencia, en `decimal`, `hexadecimal` y `binario`, y el valor de la direccion fisica, en decimal, hexadecimal y binario.
El desplazamiento en cada referencia siempre sera __cero__.

Por ejemplo:
Suponga que el tamano de pagina es `1 kilobyte`, el tamano de la memoria virtual es `16 kilobytes`, el de la memoria fisica `8 kilobytes` y el nümero de paginas que tiene el
proceso es de `14`. Entonces una posible entrada del archivo de texto es:
```
1024 16 8 14
5
3
1
6
5
5
3
7
9
10
11
12
10
8
9
4
13
14
12
5
13
12
7
2
5
```
Cuando el proceso lance una direccinn virtual, en ese instante se colocara esa pagina en el `marco O`, para este ejemplo, la `pagina 5` estara en el `marco O`. Después se hara referencia a la `pagina 3`, entonces ésta se colocara en el `marco 1`, y asi sucesivamente, mientras haya fallo de pagina. Si no hay fallo de pagina simplemente
se realizara la traduccinn de direccinn virtual en direccion fisica. Si al producirse un fallo de pagina no hay espacio en memoria fisica, hay que ejecutar un algoritmo de remplazo de paginas, eliminar una pagina de memoria fisica y colocar ahi la pagina referenciada.
Tome en cuenta que al eliminar una pagina de la memoria fisica, se debera cambiar su bit _presente/ausente_ en su entrada correspondiente en la tabla de paginas.