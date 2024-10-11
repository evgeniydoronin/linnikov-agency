<?php get_header(); ?>

  <main>
    <section class="hero">
      <div class="section-container section-container_decor hero__container">
        <h1 class="tg-h1"><?php echo get_the_title(); ?></h1>
      </div>
    </section>
    <section id="categories-grid" class="categories-grid">
      <div class="section-container section-container_decor categories-grid__container">
        <div class="categories-grid__inner">
          <?php
          // Массив с фиксированной последовательностью id
          $categories_with_ids = [
            ['id' => 1],
            ['id' => 5],
            ['id' => 3],
            ['id' => 4],
            ['id' => 6],
            ['id' => 2],
            ['id' => 7],
            ['id' => 8]
          ];

          // Получаем динамические данные
          $categories_grid = get_post_meta(get_the_ID(), '_linnikov_agency_categories_grid', true);

          // Проверяем, что данные получены корректно
          if (!empty($categories_grid) && is_array($categories_grid)) {
            // Объединяем данные из $categories_with_ids с динамическими данными
            foreach ($categories_grid as $index => $category) {
              // Добавляем id из заранее определённого массива
              $categories_grid[$index]['id'] = $categories_with_ids[$index]['id'];

              // Объединяем title и title2 в одно поле
              $categories_grid[$index]['full_title'] = $category['title'] . ' ' . $category['title2'];
            }
          }

          // Выводим данные
          foreach ($categories_grid as $category): ?>
            <div class="category-card" data-active="true">
              <div class="category-card__inner">
                <div class="category-card__border">
                  <div></div>
                  <div></div>
                </div>
                <div class="category-card__main" data-elem="main">
                  <div data-component="animated-icon" data-id="<?php echo $category['id']; ?>"
                       class="animated-icon category-card__icon">
                    <canvas width="50" height="46"></canvas>
                    <div data-elem="overlay"></div>
                  </div>

                  <div class="category-card__title">
                    <?php echo $category['title']; ?> <br><span class="white-space-nowrap"><?php echo $category['title2']; ?> <span class="category-card__arrow ref-arrow-icon">
											<span class="icon-cubic-ref-arrow"></span>
											<span class="icon-cubic-ref-arrow"></span>
										</span>
										</span>
                  </div>
                </div>
                <div class="category-card__disclosure" data-elem="disclosure">
                  <div class="category-card__disclosure-inner" data-elem="disclosure-inner">
                    <div class="category-card__desc">
                      <?= $category['description']; ?>
                    </div>
                  </div>
                </div>
                <div class="double-cubic-decor category-card__decor"></div>
              </div>
            </div>
          <?php endforeach; ?>
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="1" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Brand <br><span class="white-space-nowrap">Launch <span class="category-card__arrow ref-arrow-icon">-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--										</span></span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Development of a new brand, turnkey business from scratch-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="5" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Brand <br><span class="white-space-nowrap">Update <span class="category-card__arrow ref-arrow-icon">-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--										</span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Brand change due to growth, reaching a new stage of maturity or changes in market conditions and-->
          <!--                  trends-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="3" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">Creative <br><span class="white-space-nowrap">Vision <span-->
          <!--                      class="category-card__arrow ref-arrow-icon"><span class="icon-cubic-ref-arrow"></span><span-->
          <!--                        class="icon-cubic-ref-arrow"></span></span></span></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Stay on trend and look modern with professional designs tailored to your brand platform-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="4" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Brand <br><span class="white-space-nowrap">Platform <span class="category-card__arrow ref-arrow-icon">-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--											</span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Creation of a unique brand positioning, taking into account the target audience, market, product. A-->
          <!--                  solid foundation for brand development.-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="6" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Marketing <br><span class="white-space-nowrap">Strategy <span-->
          <!--                      class="category-card__arrow ref-arrow-icon">-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--											</span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Developing and executing a long-term strategy to ensure consistent and impactful brand messaging to-->
          <!--                  engage the target consumers.-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="2" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Brand <br><span class="white-space-nowrap">Expansion <span class="category-card__arrow ref-arrow-icon">-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--											</span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Helping a brand expand into new categories, markets, audiences, or geographies-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="7" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Websites <br>and <span class="white-space-nowrap">apps <span-->
          <!--                      class="category-card__arrow ref-arrow-icon">-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--												<span class="icon-cubic-ref-arrow"></span>-->
          <!--											</span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  A professional website is an integral part of modern business, contributing to growth, strengthening-->
          <!--                  the brand, and improving customer relationships.-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div class="category-card" data-active="true">-->
          <!--          <div class="category-card__inner">-->
          <!--            <div class="category-card__border">-->
          <!--              <div></div>-->
          <!--              <div></div>-->
          <!--            </div>-->
          <!--            <div class="category-card__main" data-elem="main" data-elem="main">-->
          <!--              <div data-component="animated-icon" data-id="8" class="animated-icon category-card__icon">-->
          <!--                <canvas width="50" height="46"></canvas>-->
          <!--                <div data-elem="overlay"></div>-->
          <!--              </div>-->
          <!--              <div class="category-card__title">-->
          <!--                Packaging <span class="category-card__arrow ref-arrow-icon">-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--											<span class="icon-cubic-ref-arrow"></span>-->
          <!--										</span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="category-card__disclosure" data-elem="disclosure">-->
          <!--              <div class="category-card__disclosure-inner" data-elem="disclosure-inner">-->
          <!--                <div class="category-card__desc">-->
          <!--                  Involves the integration of aesthetics and functionality to reinforce brand identity and drive sales.-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="double-cubic-decor category-card__decor"></div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
      </div>
    </section>
    <section id="levels-composition" class="levels-composition competencies__levels-composition"
             data-track-intersection="0.5">
      <div class="section-container section-container_decor">
        <div class="section-container__inner levels-composition__inner">
          <div class="levels-list levels-composition__list">
            <div class="levels-list__inner">
              <div class="tg-h2 levels-list__item" data-active="true">Person</div>
              <div class="tg-h2 levels-list__item" data-active="true">Product</div>
              <div class="tg-h2 levels-list__item" data-active="true">Team</div>
              <div class="tg-h2 levels-list__item" data-active="true">Company</div>
              <div class="tg-h2 levels-list__item" data-active="true">World</div>

              <div class="tg-service uppercase levels-list__pre levels-list__pre_person reveal-wrap">
                <div class="reveal-wrap__inner">
                  <div class="reveal-wrap__item">Being a better</div>
                </div>
              </div>
              <div class="tg-service uppercase levels-list__pre levels-list__pre_other reveal-wrap">
                <div class="reveal-wrap__inner">
                  <div class="reveal-wrap__item">Building a better</div>
                </div>
              </div>
              <div class="tg-h2 levels-list__thumb"></div>
            </div>
          </div>
          <div class="levels-composition__chart">
            <div class="levels-chart uppercase">
              <svg class="levels-chart__item levels-chart__item_1" viewBox="0 0 110 110" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="levels-chart__item-border" cx="55" cy="55" r="54" stroke-width="2"></circle>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="currentColor">human</text>
              </svg>
              <svg class="levels-chart__item levels-chart__item_2" viewBox="0 0 250 250" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="levels-chart__item-border" cx="125" cy="125" r="123" stroke-width="2"></circle>
                <path id="levels-chart__l-2-path_1" class="levels-chart__l-2-path"
                      d="M125 38 A87 87 270 1 1 123.48 38.01z" stroke="none"></path>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-2-path_1" startOffset="16.667%">design</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-2-path_1" startOffset="50%">technology</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-2-path_1" startOffset="83.333%">process</textPath>
                </text>
                <path d="M125.5 7.21484V65.4637" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M73.5724 155.566L23.1328 184.682" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M177.613 155.248L228.061 184.364" stroke-width="2" stroke-miterlimit="10"/>
              </svg>
              <svg class="levels-chart__item levels-chart__item_3" viewBox="0 0 392 392" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="levels-chart__item-border" cx="196" cy="196" r="195" stroke-width="2"></circle>
                <path id="levels-chart__l-3-path" class="levels-chart__l-3-path" d="M41 196 a155 155 0 1 1 0 1z"
                      stroke="none"></path>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-3-path" startOffset="25%">communication</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-3-path" startOffset="75%">management</textPath>
                </text>
                <path d="M384.134 196H325.98" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M66.0215 196H7.85938" stroke-width="2" stroke-miterlimit="10"/>
              </svg>
              <svg class="levels-chart__item levels-chart__item_4" viewBox="0 0 532 532" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="levels-chart__item-border" cx="266" cy="266" r="265" stroke-width="2"></circle>
                <path id="levels-chart__l-4-path" class="levels-chart__l-4-path" d="M266 39 a227 227 0 1 1 -1 0z"
                      stroke="none"></path>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-4-path" startOffset="16.667%">operations</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-4-path" startOffset="50%">enterpreneurship</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-4-path" startOffset="83.333%">finance</textPath>
                </text>
                <path d="M266 7.82227V65.9844" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M92.8723 366.037L42.5078 395.118" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M439.309 365.764L489.682 394.836" stroke-width="2" stroke-miterlimit="10"/>
              </svg>
              <svg class="levels-chart__item levels-chart__item_5" viewBox="0 0 670 670" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="levels-chart__item-border" cx="335" cy="335" r="334" stroke-width="2"></circle>
                <path id="levels-chart__l-5-path" class="levels-chart__l-5-path" d="M335 39 a296 296 0 1 1 -1 0z"
                      stroke="none"></path>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-5-path" startOffset="16.667%">environment</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-5-path" startOffset="50%">strategy</textPath>
                </text>
                <text dominant-baseline="middle" text-anchor="middle">
                  <textPath href="#levels-chart__l-5-path" startOffset="83.333%">culture</textPath>
                </text>
                <path d="M335 6.78906V64.9512" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M101.224 470.053L50.8594 499.134" stroke-width="2" stroke-miterlimit="10"/>
                <path d="M568.965 469.771L619.329 498.853" stroke-width="2" stroke-miterlimit="10"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="cs-animation">
      <section class="cs-mob-animation">
        <div class="section-container section-container_decor">
          <div class="section-container__inner cs-mob-animation__padding-top">
            <div class="cs-mob-tg-h1 cs-mob-msg-01 cs-mob-animation__msg-01">
              <div class="cs-mob-msg-01__left">Feeling</div>
              <div class="reveal-wrap cs-mob-msg-01__mid">
                <div class="reveal-wrap__inner">
                  <div class="reveal-wrap__item">></div>
                </div>
              </div>
              <div class="cs-mob-msg-01__right">Thinking</div>
            </div>
            <div class="cs-mob-tg-h2 cs-mob-msg-02 cs-mob-animation__msg-02">
              <span data-will-reveal="true">On a daily basis, an individual is required to make over</span>
            </div>
            <div class="cs-mob-msg-03 cs-mob-animation__msg-03">
              <div class="tg-huge cs-mob-msg-03__top">35,000</div>
              <div class="cs-mob-tg-h2 cs-mob-msg-03__bottom"><span data-will-reveal="true">decisions.</span></div>
            </div>
            <div class="cs-mob-msg-04 cs-mob-animation__msg-04">
              <div class="tg-huge cs-mob-msg-04__top">80%</div>
              <div class="cs-mob-tg-h2 cs-mob-msg-04__bottom">
                <span data-will-reveal="true">of these choices are made based on emotional impulses rather than rational thought processes.</span>
              </div>
            </div>
            <div class="cs-mob-tg-h1 cs-mob-msg-05 cs-mob-animation__msg-05">
              <span data-will-reveal="true">Trigger сhange</span>
            </div>
            <div class="cs-mob-msg-06 cs-mob-animation__msg-06">
              <div class="cs-mob-tg-h2 cs-mob-msg-06__top"><span data-will-reveal="true">Most advertising targets rational thinking: the other</span>
              </div>
              <div class="tg-huge cs-mob-msg-06__bottom">
                <span data-will-reveal="true">20%</span>
              </div>
            </div>
            <div class="cs-mob-tg-h2 cs-mob-msg-07 cs-mob-animation__msg-07">
              <span data-will-reveal="true">But appealing to our highly cognitive brain does not influence the biases that trigger real changes in consumer behavior.</span>
            </div>
            <div class="cs-mob-animation__diagram">
              <div class="pie-diagram pie-diagram_inverted">
                <svg class="pie-diagram__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                  <circle cx="150" cy="150" r="75" class="pie-diagram__a"></circle>
                  <circle cx="150" cy="150" r="75" class="pie-diagram__b"></circle>
                  <path d="M150 300 V150 L200 280" fill="none" class="pie-diagram__edge"></path>
                </svg>
                <div class="pie-diagram__labels">
                  <div class="pie-diagram__label pie-diagram__label_a">
                    <div class="reveal-wrap pie-diagram__value">
                      <div class="reveal-wrap__inner">
                        <div class="reveal-wrap__item">80<sub>%</sub></div>
                      </div>
                    </div>
                    <div class="reveal-wrap pie-diagram__name">
                      <div class="reveal-wrap__inner">
                        <div class="reveal-wrap__item">feeling</div>
                      </div>
                    </div>
                  </div>
                  <div class="pie-diagram__label pie-diagram__label_b">
                    <div class="reveal-wrap pie-diagram__value">
                      <div class="reveal-wrap__inner">
                        <div class="reveal-wrap__item">20<sub>%</sub></div>
                      </div>
                    </div>
                    <div class="reveal-wrap pie-diagram__name">
                      <div class="reveal-wrap__inner">
                        <div class="reveal-wrap__item">thinking</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="inverted-background cs-mob-closing">
        <div class="section-container section-container_decor section-container_inverted cs-mob-closing__container">
          <div class="section-container__inner">
            <div class="cs-mob-animation__msg-08">
              <div class="cs-mob-tg-h2 cs-mob-msg-08">
                <span data-will-reveal="true">To create unique experiences and evoke trustful emotions, we use the following tools:</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="tools competencies__tools">
      <div id="tools-frames" class="tg-h2 frames-stack frames-stack_tools">
        <div class="section-container section-container_decor frames-stack__underlay"></div>
        <div class="frames-stack__inner">
          <?php
          $competencies_tools = get_post_meta(get_the_ID(), '_linnikov_agency_competencies_tools', true);

          if ($competencies_tools && is_array($competencies_tools)) :
            foreach ($competencies_tools as $index => $tool) :
              // Извлекаем значения заголовка, описания и ссылки
              $title = isset($tool['title']) ? esc_html($tool['title']) : '';
              $description = isset($tool['description']) ? esc_html($tool['description']) : '';
              $link = isset($tool['link']) ? esc_url($tool['link']) : '#';

              // Статические ссылки для декора svg в зависимости от индекса
              $svg_id_d = $index + 1;
              $svg_id_m = $index + 1 . 'm';
              ?>
              <div class="fs-frame frames-stack__frame">
                <div class="fs-frame__wrap" data-elem="frames-stack.frame.wrap">
                  <svg class="fs-frame__decor fs-frame__decor_d">
                    <use
                        href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#<?php echo $svg_id_d; ?>"></use>
                  </svg>
                  <svg class="fs-frame__decor fs-frame__decor_m">
                    <use
                        href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#<?php echo $svg_id_m; ?>"></use>
                  </svg>
                  <div class="fs-frame__clip" data-elem="frames-stack.frame.clip">
                    <div class="section-container section-container_decor fs-frame__container">
                      <div class="section-container__inner fs-frame__inner" data-elem="frames-stack.frame.inner">
                        <div class="fs-frame__header" data-elem="frames-stack.frame.header">
                          <?php echo $title; ?>
                        </div>
                        <div class="tg-h3 fs-frame__body competencies-tools__item-body"
                             data-elem="frames-stack.frame.body">
                          <?php echo $description; ?>
                          <a href="<?php echo $link; ?>" class="tg-h4 competencies-tools__item-btn">
                            <div class="ref-arrow-icon">
                              <span class="icon-cubic-ref-arrow"></span>
                              <span class="icon-cubic-ref-arrow"></span>
                            </div>
                            Learn more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <?php endforeach;
          endif;
          ?>
          <div class="fs-frame frames-stack__frame">
            <div class="fs-frame__wrap" data-elem="frames-stack.frame.wrap">
              <svg class="fs-frame__decor fs-frame__decor_d">
                <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#4"></use>
              </svg>
              <svg class="fs-frame__decor fs-frame__decor_m">
                <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#4m"></use>
              </svg>
              <div class="fs-frame__clip">
                <div class="section-container section-container_decor fs-frame__container">
                  <div class="section-container__inner fs-frame__inner" data-elem="frames-stack.frame.inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="faq-section">
      <div class="section-container section-container_decor" data-track-intersection>
        <div class="section-container__inner faq-section__hero">
          <h2 class="tg-h2 faq__title" data-component="in-view-text-reveal">We possess the ability to address the five
            fundamental questions that guide any transformative process.</h2>
        </div>
      </div>
      <div id="faq-items" class="tg-h2 faq-stack">
        <div class="section-container section-container_decor faq-stack__underlay"></div>
        <?php
        // Получаем данные из метабокса FAQ Section
        $faq_section = get_post_meta(get_the_ID(), '_linnikov_agency_faq_section', true);

        if ($faq_section && is_array($faq_section)) :
          ?>
          <div class="faq-stack__inner" data-elem="faq-composit.inner">
            <?php foreach ($faq_section as $index => $faq) :
              $title = isset($faq['title']) ? esc_html($faq['title']) : '';
              $subtitle = isset($faq['subtitle']) ? esc_html($faq['subtitle']) : '';
              $answers = isset($faq['answers']) ? $faq['answers'] : [];
              $svg_id = $index + 1; // SVG-декорация зависит от индекса
              ?>
              <div class="faq-item" data-component="faq-composit-item">
                <!-- SVG-декорации зависят от индекса -->
                <svg class="faq-item__decor faq-item__decor_d">
                  <use
                      href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#faq-<?php echo $svg_id; ?>"></use>
                </svg>
                <svg class="faq-item__decor faq-item__decor_m">
                  <use
                      href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#faq-<?php echo $svg_id; ?>m"></use>
                </svg>

                <!-- Внутренний блок вопроса и ответов -->
                <div class="faq-item__wrap">
                  <div class="section-container section-container_decor faq-item__container">
                    <div class="faq-item__inner disclosure"
                         data-elem="faq-composit-item.disclosure,disclosure.toggle-btn">
                      <div class="faq-item__header" data-active="true">
                        <div class="section-container__inner">
                          <div class="tg-h3 faq-item__question"><?php echo $title; ?></div>
                          <button type="button" class="faq-item-btn faq-item__btn">
                            <div class="icon-cubic-minus"></div>
                            <div class="icon-cubic-minus"></div>
                          </button>
                        </div>
                      </div>

                      <!-- Ответы -->
                      <div class="section-container__inner faq-item__body disclosure__body">
                        <div class="faq-item__body-inner" data-elem="disclosure.inner">
                          <?php if ($subtitle) : ?>
                            <div class="tg-h3 faq-item__answer"><?php echo $subtitle; ?></div>
                          <?php endif; ?>
                          <?php if (!empty($answers)) : ?>
                            <ul class="faq-item__steps">
                              <?php foreach ($answers as $answer) : ?>
                                <li><?php echo esc_html($answer); ?></li>
                              <?php endforeach; ?>
                            </ul>
                          <?php endif; ?>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>

            <!-- Статичный последний пункт -->
            <div class="faq-item">
              <svg class="faq-item__decor faq-item__decor_d">
                <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#faq-6"></use>
              </svg>
              <svg class="faq-item__decor faq-item__decor_m">
                <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/faq/decor.svg#faq-6m"></use>
              </svg>
              <div class="faq-item__wrap">
                <div class="section-container section-container_decor faq-item__container">
                  <div class="section-container__inner faq-item__inner"></div>
                </div>
              </div>
            </div>
          </div>
        <?php
        endif;
        ?>
      </div>
    </div>
  </main>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();