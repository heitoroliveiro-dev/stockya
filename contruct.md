# Resumo Cronológico do Projeto Stockya

## 1. Estruturação do Projeto
- Criada a solução e o projeto ASP.NET Core Web API (`Stockya.Api`) dentro da pasta `backend`.
- Estrutura de pastas organizada:
  - `backend/Stockya.Api` para o código da API.
  - `backend/Stockya.Api/Data` para o DbContext e modelos.

## 2. Configuração do Entity Framework Core
- Instalados os pacotes necessários:
  - `Microsoft.EntityFrameworkCore.SqlServer`
  - `Microsoft.EntityFrameworkCore.Design`
- Criado o arquivo `StockyaDbContext.cs` com o DbSet de `Product`.
- Adicionado o registro do `StockyaDbContext` no DI container em `Program.cs` usando a string de conexão do `appsettings`.

## 3. Configuração do Swagger
- Instalado o pacote `Swashbuckle.AspNetCore`.
- Adicionados os métodos `AddEndpointsApiExplorer()` e `AddSwaggerGen()` em `Program.cs`.
- Configurado o uso do Swagger na pipeline de desenvolvimento.

## 4. Configuração do Docker
- Criado o arquivo `Dockerfile` na pasta `backend` para build e publicação da API.
- Criado o arquivo `docker-compose.yml` na raiz do projeto para orquestrar:
  - O serviço do banco de dados SQL Server (`db`), expondo a porta `14330`.
  - O serviço da API (`api`), construindo a imagem a partir do Dockerfile e expondo a porta `8080`.
- Corrigidos nomes de volumes e variáveis de ambiente no compose.

## 5. Ajustes de String de Conexão
- Definida a string de conexão no `appsettings.Development.json` para:
  - `localhost,14330` ao rodar localmente.
  - `db` ao rodar dentro do container.

## 6. Execução e Troubleshooting
- Containers Docker foram criados e ajustados (corrigidos problemas de porta, senha e volumes).
- Corrigidos avisos do EF Core sobre precisão do campo decimal (`Price`) no modelo `Product` usando `.HasColumnType("decimal(18,2)")`.
- Criada a primeira migration com `dotnet ef migrations add InitialCreate`.
- Corrigidos problemas de conexão e autenticação com o SQL Server.
- Aplicada a migration com `dotnet ef database update`.

## 7. Situação Atual
- Projeto está rodando com API ASP.NET Core, banco SQL Server em container, Swagger configurado e Entity Framework Core funcionando com migrations.
