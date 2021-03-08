# TypeORM Example
## Descrição
Exemplo de utilização do TypeORM com o docker. 
- como versionar um banco com o CLI do TypeOrm

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

### 4 - Instalação da Aplicação 
``` bash
# install dependencies
npm install

# install devDependencies
npm install --save-dev
```

### 5 - Versionando seu banco
``` bash
# Executar o comadno abaixo para criar uma migration (ver o script "typeorm" em package.json). Vai gerar o fonte chamado <timestamp-createClass.ts>
npm run typeorm migration:create -- -n CreateClass

# Ao gerar o 1614027434846-createClass.ts no comando acima serão criados dois métodos async "up" e "down" onde "up" cria e constroe e "down" desfaz ou dropa etc.
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class',
            // código omitido, onde você define a tabela e colunas da migração.
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // código omitido
  }

# Executando a migration gerada no comando acima vai gerar um arquivo chamado <timestamp-createClass.ts>
npm run typeorm migration:run

# observe na sequencia que vai criar a tabela "class" e a "migration" que server para guardar as mudanças de versão. O mesmo foi feito para a tabela "lesson"

# comando para criar uma entity a partir da tabela.
npx typeorm entity:create -n Class
```
### 6 - Inserir e Pesquisar Dados no Postman

Primeiro execute o comando subindo a aplicação na porta 3000
``` bash
npm start 
```

Usando POST para inserir http://localhost:3000/class 
``` bash
{
    "name": "Tecnologia da Informação",
    "duration": 120
}
```

Usando GET para consultar a lista de dados 
http://localhost:3000/class/all

Usando GET para pesquisar pelo id
http://localhost:3000/class/id/<id>

Usando GET para pesquiser pelo nome da class
http://localhost:3000/class/name/<name>

### Mais referencias:
- Você pode ver a documentação completa do TypeOrm aqui:
https://typeorm.io/

- O curso completo onde aprendi sobre este projeto se encontra em:
https://www.youtube.com/playlist?list=PLDqnSpzNKDvn-3cpMf3yPn7gTnb3ooy4b