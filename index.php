<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="The LNM Institute of Information Technology">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <title>The LNM Institute of Information Technology</title>

  <!-- Page styles -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/material.css">
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <main>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">

      <div class="mdl-layout__header mdl-layout__header--waterfall">
        <div class="mdl-layout__header-row">
          <span class="android-title mdl-layout-title">
            <a href="index.html"><img class="android-logo-image" src="images/logo-full.png"></a>
                        </span>
          <!-- Add spacer, to align navigation to the right in desktop -->
          <div class="android-header-spacer mdl-layout-spacer"></div>
          <div class="android-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="search-field">
                            <i class="material-icons">https</i>
                          </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" id="search-field">
            </div>
          </div>
          <!-- Navigation -->
          <div class="android-navigation-container">
            <nav class="android-navigation mdl-navigation">
              <a class="mdl-navigation__link mdl-typography--text-uppercase active" href="about-us/index.html">about lnmiit</a>
              <a class="mdl-navigation__link mdl-typography--text-uppercase" href="admissions/index.html">admissions</a>
              <a class="mdl-navigation__link mdl-typography--text-uppercase" href="academics/index.html">academics</a>
              <a class="mdl-navigation__link mdl-typography--text-uppercase" href="">students</a>
              <a class="mdl-navigation__link mdl-typography--text-uppercase" href="">placements</a>
            </nav>
          </div>
          <span class="android-mobile-title mdl-layout-title">
            <a href="index.html"><img class="android-logo-image" src="images/logo-full.png"></a>
                        </span>
        </div>
      </div>

      <div class="android-drawer mdl-layout__drawer">
        <nav class="mdl-navigation">
          <span class="mdl-navigation__link"><a href="about-us/index.html" style="color: #C34A4C !important;">About LNMIIT</a></span>
          
          <div class="android-drawer-separator"></div>
          <span class="mdl-navigation__link"><a href="admissions/index.html" style="color: #C34A4C !important;">Admissions</a></span>
          
          <div class="android-drawer-separator"></div>
          <span class="mdl-navigation__link" ><a href="academics/index.html" style="color: #C34A4C !important;">Academics</a></span>
          <div class="android-drawer-separator"></div>
          <span class="mdl-navigation__link" href="">Students</span>
          <div class="android-drawer-separator"></div>
          <span class="mdl-navigation__link" href="">Placements</span>
        </nav>
      </div>
      <div class="android-content mdl-layout__content">
        <a name="top"></a>

        <!--Carousel Wrapper-->
        <div id="myCarousel" class="carousel slide full-screen" data-ride="carousel" style="height: auto; width:100%; overflow: hidden;">
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
          </ol>
          <div class="carousel-inner" role="listbox">
            <div class="item active">
              <img src="images/y17batch.jpg" alt="y17batch" style="height:auto; width:100%;">
              <div class="carousel-caption">
                  <h1 class="highlight-quote">"Joining of the class of 2021"</h1>
                </div>
            </div>
            <div class="item">
              <img src="images/lnmiit.jpg" alt="campus" style="height:auto; width:100%;">
              <div class="carousel-caption highlight-quote">
                  <h1 class="highlight-quote">"LNMIIT Campus"</h1>
                </div>
            </div>
          </div>
        </div>
        <!--/.Carousel Wrapper-->

        <div class="mdl-grid" style="padding:0px">
          <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet" style="height:540px; background-color:#F5F5F5; margin:0px 0px 0px 0px; padding:8px; overflow:hidden !important; padding-bottom: 0px;">
            <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
              <div class="mdl-tabs__tab-bar" style="margin-left:5%; margin-right:5%;">
                <a href="#notice-board" class="mdl-tabs__tab is-active header-text" style="outline: none !important;">NOTICE BOARD</a>
                <a href="#events" class="mdl-tabs__tab header-text" style="outline: none !important;">EVENTS</a>
                <a href="#research" class="mdl-tabs__tab header-text" style="outline: none !important;">RESEARCH HIGHLIGHTS</a>
              </div>

              <div class="mdl-tabs__panel is-active" id="notice-board">
                <!--do here-->
                <div class="vticker" style="width:auto !important; margin-top:12px;">
                <?php
                    $file_handle = fopen("notices.txt", "rb");
                    echo "<ul>";
                    
                    while (!feof($file_handle) ) {
                        $line_of_text = fgets($file_handle);
                        $parts = explode(':', $line_of_text);
                        echo "<li class=\"ww\">
                        <div class=\"card-news mdl-card mdl-shadow--2dp\">
                          <div class=\"mdl-card__supporting-text\">
                            $parts[0]
                          </div>
                          <button class=\"mdl-button mdl-js-button mdl-js-ripple-effect news-visit\">
                                  VISIT
                          </button>
                        </div>
                      </li>";
                    }
                    fclose($file_handle);
                    echo "</ul>";
                    ?>
                </div>
              </div>
              <div class="mdl-tabs__panel" id="events">
                <!--do here-->
                <div class="vticker" style="width:auto !important; margin-top:12px;">
                    <?php
                    $file_handle = fopen("events.txt", "rb");
                    echo "<ul>";
                    
                    while (!feof($file_handle) ) {
                        $line_of_text = fgets($file_handle);
                        $parts = explode(':', $line_of_text);
                        echo "<li class=\"ww\">
                        <div class=\"card-news mdl-card mdl-shadow--2dp\">
                          <div class=\"mdl-card__supporting-text\">
                            <b>$parts[0]</b> $parts[1]
                          </div>
                          <button class=\"mdl-button mdl-js-button mdl-js-ripple-effect news-visit\">
                                  VISIT
                          </button>
                        </div>
                      </li>";
                    }
                    fclose($file_handle);
                    echo "</ul>";
                    ?>
                </div>
              </div>
              <div class="mdl-tabs__panel" id="research">
                <!--do here-->
                <div class="vticker" style="width:auto !important; margin-top:12px;">
                <?php
                    $file_handle = fopen("research.txt", "rb");
                    echo "<ul>";
                    
                    while (!feof($file_handle) ) {
                        $line_of_text = fgets($file_handle);
                        $parts = explode(':', $line_of_text);
                        echo "<li class=\"ww\">
                        <div class=\"card-news mdl-card mdl-shadow--2dp\">
                          <div class=\"mdl-card__supporting-text\">
                            <b>$parts[0]</b> $parts[1]
                          </div>
                          <button class=\"mdl-button mdl-js-button mdl-js-ripple-effect news-visit\">
                                  VISIT
                          </button>
                        </div>
                      </li>";
                    }
                    fclose($file_handle);
                    echo "</ul>";
                    ?>
                </div>
              </div>
            </div>

          </div>

          <div class="mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet" style="height:530px; padding:8px; overflow:hidden !important; padding-bottom: 0px; margin-bottom: 0px;">
            <h2 class="mdl-typography--font-light mdl-typography--display-2" style="margin-top:1px; margin-bottom:3px;">Words from our alumnus</h2>
            <section class="section--footer mdl-color--white mdl-grid">
              <div class="section__circle-container mdl-cell--2-col-desktop mdl-cell mdl-cell--4-col mdl-cell--1-col-phone">
                <img src="images/profile.png" class="img-circle img-responsive">
              </div>
              <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                <h5 class="myheading">Ajay Singh Rathore -Y09</h5>
                <p class="myarticle">
                <b>Assistant Marketing Manager at HT Media Ltd</b><br>LNMIITians as a part of big family have this shared
                identity of being treated with similar values in same milieu. Knowingly or unknowingly, we imbue these values
                in the world around us. At the same time undergoing through similar hardships and challenges.
                </p>
              </div>
            </section>
            <hr>
            <section class="section--footer mdl-color--white mdl-grid">
              <div class="section__circle-container mdl-cell--2-col-desktop mdl-cell mdl-cell--4-col mdl-cell--1-col-phone">
                <img src="images/profile.png" class="img-circle img-responsive">
              </div>
              <div class="section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone">
                <h5 class="myheading">Kushal Shah -Y11</h5>
                <p class="myarticle">
                <b>Researcher at QCRI</b><br>Alumni are the true ambassadors of any university, because whatever we do in
                our respective fields is going to affect not only to our families, but to families of innumerable unknown
                juniors. Initiatives like these give alumni the sense of being and the comprehension of giving back to the
                place that made them who they are.
                </p>
              </div>
            </section>
          </div>
        </div>

        <footer class="mdl-mega-footer">
          <div class="mdl-mega-footer__middle-section">

            <div class="mdl-mega-footer__drop-down-section">
              <h1 class="mdl-mega-footer__heading">ABOUT INSTITUTE</h1>
              <ul class="mdl-mega-footer__link-list myarticle">
                <li><a href="#">Photo Gallery</a></li>
                <li><a href="#">Institute Brochure</a></li>
                <li><a href="https://www.lnmiit.ac.in/Course%20Offered/Courses_Offered.html">Courses Offered</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div class="mdl-mega-footer__drop-down-section">
              <h1 class="mdl-mega-footer__heading">STUDENT BODIES</h1>
              <ul class="mdl-mega-footer__link-list myarticle">
                <li><a href="#">CSI Student Branch</a></li>
                <li><a href="#">IEEE Student Branch</a></li>
                <li><a href="#">Science & Technology Council</a></li>
                <li><a href="#">Cultural Council</a></li>
                <li><a href="#">Sports Council</a></li>
              </ul>
            </div>


            <div class="mdl-mega-footer__drop-down-section">
              <h1 class="mdl-mega-footer__heading">TECHNOLOGY</h1>
              <ul class="mdl-mega-footer__link-list myarticle">
                <li><a href="#">Centre for Smart Technologies</a></li>
                <li><a href="#">Centre for Machine Learning and Big Data</a></li>
                <li><a href="#">Centre for Robotics and Artificial Intelligence</a></li>
                <li><a href="#">Centre for Entrepreneurial Leadership</a></li>
                <li><a href="#">Technology Business Incubator</a></li>
              </ul>
            </div>

            <div class="mdl-mega-footer__drop-down-section">
              <h1 class="mdl-mega-footer__heading">CONTACT US</h1>
              <ul class="mdl-mega-footer__link-list myarticle">
                <li>
                  <b>Postal Address:</b><br>Rupa ki Nangal, Post-Sumel, Via-Jamdoli<br>Jaipur, Rajasthan<br>302031
                </li>
                <li>
                  <b>Contact Information</b>
                </li>
                <li>
                  Toll-free Number : 1800-180-6566
                </li>
                <li>
                  Admission related query : 0141-5191-791/792
                </li>
                <li>
                  Administrative query : 0141-5191-713/720
                </li>
                <li>
                  Tel: 0141-5191-851/852<br> Fax: 0141-2689014<br> Email: info.lnmiit@lnmiit.ac.in
                </li>
              </ul>
            </div>

          </div>

          <div class="mdl-mega-footer__bottom-section">
            <div class="mdl-logo">Info Display Policy</div>
            <ul class="mdl-mega-footer__link-list">
              <li><a href="#">RTI</a></li>
              <li><a href="#">Forms</a></li>
            </ul>
          </div>

        </footer>



        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
        <script type="text/javascript">
          $(document).ready(function () {

            var dd = $('.vticker').easyTicker({
              direction: 'up',
              easing: 'easeInOutBack',
              speed: 'slow',
              interval: 2000,
              height: 'auto',
              visible: 5,
              mousePause: 1,
            }).data('easyTicker');
          });
        </script>
        <script src="/scripts/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/jquery.easing.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.easy-ticker.min.js"></script>
      </div>
  </main>
</body>

</html>