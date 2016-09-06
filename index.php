<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="generator"
    content="HTML Tidy for HTML5 (experimental) for Windows https://github.com/w3c/tidy-html5/tree/c63cc39" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Inviter Plugins</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/animate.css" />
    <link rel="stylesheet" href="css/custom.css" />
  </head>
  <body>
  <div id="login"></div>
  <div class="container">
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills pull-right">
          <li role="presentation" class="active">
            <a href="#">Home</a>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">Inviter Plugins</h3>
    </div>
    <div class="jumbotron">
      <h1>Inviter plugins</h1>
      <p class="lead">an simple plugins to fetch your contact book by sign in over each email provider API. This plugins wouldn't store any information to Author except cookies store on your browser (the cookies contains access token with less days expired). </p>
      <div id="inviter-social-button" style="display:none">
      <a href="javascript:authGoogle()">
        <img src="img/google.png" />
      </a>
      <a href="javascript:authMicrosoft()">
        <img src="img/outlook.png" />
      </a>
      <a href="javascript:authYahoo()">
        <img src="img/yahoo.png" />
      </a></div>
    </div>
    <div class="col-lg-12">
      <div id="interact" style="overflow:hidden">
      <div id="allcaughtup" class="text-center" style="margin:3em auto;display:none">
        <h2>All caught up !</h2>
      </div>
      <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>
              <input type="checkbox"/>
            </th>
          </tr>
        </thead>
		<tbody></tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              <input type="button" class="btn btn-default pull-right" value="Invite" onclick="invite()" />
            </td>
          </tr>
        </tfoot>
      </table></div></div>
      <div style="display:none">
        <div>debug result:</div>
        <textarea id="result" class="form-control" rows="10"></textarea>
      </div>
    </div>
    <div class="clearfix"></div>
    <footer class="footer">
      <p>&copy; <?php echo date('Y') ?> Written by Antony Tanuputra</p>
    </footer>
  </div>
  <!-- /container -->
  <script src="https://apis.google.com/js/client.js"></script>
  <script src="https://js.live.net/v5.0/wl.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script src="js/app.js"></script></body>
</html>
