const gulp = require("gulp"); // Está importando o módulo gulp, que é responsável por executar as funções de build.
const sass = require("gulp-sass")(require("sass")); // Está importando o módulo gulp-sass, que é responsável por compilar o sass e transformar em css. Está passando o parâmetro require("sass"), que é responsável por importar o sass.
const autoprefixer = require("gulp-autoprefixer"); // Está importando o módulo gulp-autoprefixer, que é responsável por adicionar os prefixos necessários para o css.
const browserSync = require("browser-sync").create(); // Está importando o módulo browser-sync, que é responsável por criar um servidor local.
const concat = require("gulp-concat"); // Está importando o módulo gulp-concat, que é responsável por concatenar os arquivos.
const babel = require("gulp-babel"); // Está importando o módulo gulp-babel, que é responsável por reescrever o javascript.
const uglify = require("gulp-uglify"); // Está importando o módulo gulp-uglify, que é responsável por minificar o javascript.
const htmlmin = require("gulp-htmlmin"); // Está importando o módulo gulp-htmlmin, que é responsável por minificar o html.
const imagemin = require("gulp-imagemin"); // Está importando o módulo gulp-imagemin, que é responsável por minificar as imagens.

// Função responsável pelos arquivos html.
function html() {
  return (
    // Sempre quando queremos modificar um arquivo tem que usar o return.
    gulp
      // O ** significa que ele irá pegar todos os arquivos e pastas dentro da pasta templates.
      // O src é responsável por pegar os arquivos que serão utilizados no build.
      .src("./src/templates/**/*.html")
      // O pipe é responsável por executar as funções dentro dele, nesse caso está executando o concat que é responsável por concatenar os arquivos e passando o parâmetro header.html, que é o nome do arquivo que será gerado.
      .pipe(concat("index.html"))
      // O pipe é responsável por executar as funções dentro dele, nesse caso está executando o htmlmin que é responsável por minificar o html, passando o parâmetro collapseWhitespace como true, que é responsável por remover os espaços em branco.
      .pipe(htmlmin({ collapseWhitespace: true }))
      // O pipe é responsável por executar as funções dentro dele, nesse caso está executando o dest que é responsável por enviar os arquivos para a pasta de destino, que no caso é a pasta dist.
      .pipe(gulp.dest("dist"))
      // O pipe é responsável por executar as funções dentro dele, nesse caso está executando o browserSync.stream() que é responsável por atualizar o navegador.
      .pipe(browserSync.stream())
  );
}

// Função responsável pelos arquivos scss/css.
function styles() {
  // Sempre quando queremos modificar um arquivo tem que usar o return.
  return (
    gulp
      // O ** significa que ele irá pegar todos os arquivos e pastas dentro da pasta styles.
      // O src é responsável por pegar os arquivos que serão utilizados no build.
      .src("./src/styles/**/*.scss")
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o concat que é responsável por concatenar os arquivos e passando o parâmetro main.css, que é o nome do arquivo que será gerado.
      .pipe(concat("main.css"))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o sass que é responsável por compilar o sass e transformar em css e passando o parâmetro outputStyle como compressed, que é responsável por comprimir o css.
      .pipe(sass({ outputStyle: "compressed" }))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o autoprefixer que é responsável por adicionar os prefixos necessários para o css e passando o parâmetro browsers como last 2 versions, que é responsável por adicionar os prefixos para as duas últimas versões dos navegadores e o cascade como false, que é responsável por remover a indentação do css.
      .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o dest que é responsável por enviar os arquivos para a pasta de destino, que no caso é a pasta dist.
      .pipe(gulp.dest("dist"))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o browserSync.stream() que é responsável por atualizar o navegador.
      .pipe(browserSync.stream())
  );
}

// Função responsável pelos arquivos js.
function scripts() {
  // Sempre quando queremos modificar um arquivo tem que usar o return.
  return (
    gulp
      // O ** significa que ele irá pegar todos os arquivos e pastas dentro da pasta scripts.
      // O src é responsável por pegar os arquivos que serão utilizados no build.
      .src("./src/scripts/**/*.js")
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o concat que é responsável por concatenar os arquivos e passando o parâmetro bundle.js, que é o nome do arquivo que será gerado.
      .pipe(concat("bundle.js"))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o babel que é responsável por reescrever o javascript e passando o parâmetro presets como @babel/env, que é responsável por reescrever o javascript para a versão mais recente.
      .pipe(babel({ presets: ["@babel/env"] }))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o uglify que é responsável por minificar o javascript.
      .pipe(uglify())
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o dest que é responsável por enviar os arquivos para a pasta de destino, que no caso é a pasta dist.
      .pipe(gulp.dest("dist"))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o browserSync.stream() que é responsável por atualizar o navegador.
      .pipe(browserSync.stream())
  );
}

// Função responsável pelas imagens.
function images() {
  // Sempre quando queremos modificar um arquivo tem que usar o return.
  return (
    gulp
      // O ** significa que ele irá pegar todos os arquivos e pastas dentro da pasta assets.
      // O src é responsável por pegar os arquivos que serão utilizados no build.
      .src("./src/assets/**/*")
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o imagemin que é responsável por minificar as imagens.
      .pipe(imagemin())
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o dest que é responsável por enviar os arquivos para a pasta de destino, que no caso é a pasta dist.
      .pipe(gulp.dest("dist"))
      // O pipe é usado para executar as funções colocadas dentro dele, nesse caso está executando o browserSync.stream() que é responsável por atualizar o navegador.
      .pipe(browserSync.stream())
  );
}

// Função responsável por criar um servidor local.
function browser() {
  // O init é responsável por iniciar o servidor local.
  browserSync.init({
    server: {
      // O baseDir é responsável por definir a pasta que será utilizada como base, que no caso é a pasta dist.
      baseDir: "dist",
    },
  });
}

// Função responsável por observar mudanças nos arquivos e executar as funções de build.
function sentinel() {
  // O watch é responsável por observar mudanças nos arquivos e executar as funções passadas como parâmetro.
  gulp.watch("./src/templates/**/*.html", html);
  gulp.watch("./src/styles/**/*.scss", styles);
  gulp.watch("./src/scripts/**/*.js", scripts);
  gulp.watch("./src/assets/**/*", images);
}

// O exports é responsável por exportar as funções para que elas possam ser executadas em outros lugares.
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.browser = browser;
exports.sentinel = sentinel;

// O series é responsável por executar as funções passadas como parâmetro em sequência, nesse caso quando o comando gulp build for executado, irá executar as funções html, styles, scripts e images.
exports.build = gulp.series(html, styles, scripts, images);

// O parallel é responsável por executar as funções passadas como parâmetro em paralelo, nesse caso quando o comando gulp for executado, irá executar as funções html, styles, scripts, images, browser e sentinel.
exports.default = gulp.parallel(
  html,
  styles,
  scripts,
  images,
  browser,
  sentinel,
);
