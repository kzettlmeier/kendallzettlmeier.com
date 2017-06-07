jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos', callback);
};

jQuery.fn.loadRepositories = function(username) {
    this.html("<span class='query'>Querying Github for " + username + "'s repositories...</span>");

    var target = this;
    $.githubUser(username, function(data) {
        var repos = data;
        sortByDate(repos);

        var projectHtml = "<div class='portfolio-grids'>";
        target.empty().replaceWith
        $(repos).each(function() {
            if (this.name != (username.toLowerCase() + '.github.com')) {
                projectHtml += "<div class='portfolio-grid about-grid'>" + 
                                    "<a href='" + this.html_url + "'>" +
                                        "<div class='view view-first'>" + 
                                            "<img src='images/Octocat.png' class='img-responsive' />" + 
                                            "<div class='mask'>" + 
                                                "<div class='info'><img src='images/hover-icon.png' alt='" + this.name + "' /></div>" +
                                                "<h3>" + this.name + "</h3>" + 
                                                "<p>" + ((this.language) ? this.language : "Multiple Languages") + "</p>" +
                                            "</div>" + 
                                        "</div>" +
                                    "</a>" + 
                                "</div>";
            }
        });
        projectHtml += "</div>";
        target.empty().html(projectHtml);
    });

    function sortByDate(repos) {
        repos.sort(function(a, b) {
            a = new Date(a.created_at);
            b = new Date(b.created_at);
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        });
    }
};