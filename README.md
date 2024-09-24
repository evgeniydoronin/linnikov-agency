# Название проекта

Краткое описание проекта и его назначения.

## Оглавление

- [Установка](#установка)
- [Обновление верстки](#обновление-верстки)
- [Полезные команды](#полезные-команды)
- [Контакты](#контакты)

## Установка

Инструкции по установке и настройке проекта.

## Обновление верстки

Для обновления верстки выполните следующие команды:

```bash
git subtree pull --prefix=wp-content/themes/linnikov-agency/git-src https://github.com/techno-trump/linnikov-agency.git main --squash
```

### После обновления от донора нужно сделать:
- заменить в файле wp-content/themes/linnikov-agency/git-src/build/js/common.min.js
> "e.innerHTML='<use href="/wp-content/themes/linnikov-agency/git-src/build/img/decor-symbols.svg#'"
- заменить в файле wp-content/themes/linnikov-agency/git-src/src/common/scripts/logo.js  
> // SVG file url url: "../wp-content/themes/linnikov-agency/img/rgb-logo.svg",
- заменить в файле wp-content/themes/linnikov-agency/git-src/build/js/team.min.js
> найти функцию и полностью заменить на этот код: renderPictureContent(){return'<source srcset="'.concat(this.board.hoveredCard.memberId,'"><img src="').concat(this.board.hoveredCard.memberId,'">')}
