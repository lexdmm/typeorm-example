# TypeORM Example
## Descrição
Exemplo de utilização do TypeORM com o docker.

### 1 - Instalação do Docker 
Primeiro baixe o docker na sua máquina e instale, ele roda em linux ou windowns 10. Mas no caso do windowns 10 somente nas verões que possuem o kernel do linux.
O download pode ser feito aqui: https://www.docker.com/products/docker-desktop

### 2 - Instalando um banco de dados no docker. 
Com o Doker instalado, crie um banco de dados baixando uma imagem no https://hub.docker.com/. Nesse projeto vou utilizar uma do sqlserver, mas você pode escolher o banco que mais gosta de usar. O link desta imagem está aqui: https://hub.docker.com/_/microsoft-mssql-server

**1 - Para o sqlserver execute o comando para baixar a imagem no doker:**
``` bash
docker pull mcr.microsoft.com/mssql/server:2017-latest
```
**2 - Para criar a instância do banco execute o comando abaixo considerando o padrão de senhas do sqlserver:**
``` bash
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1440:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```
Defini uma senha para o banco que se encontra no arquivo ormconfig.json na porta 1440, mas você pode definir a porta e a senha que quiser, ao conectar nessa porta ele direciona para porta 1433 dentro do docker. **Nesse momento não me preocupei em expor a senha do banco, porquê é um banco para fins de teste, tenha esse cuidado no gitHub**.
### 3 - Instalação doSQL Server Management Studio (SSMS)
Baixar o SQL Server Management Studio (SSMS) para manipular o banco de dados:
https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15
Como a Microsoft vive mudando os links, pesquise pelo nome que achará facilmente.


