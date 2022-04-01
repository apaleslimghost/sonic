# name: Cache skipping
# purpose: Allows skipping of the fastly cache
# owner: everyone
# why am I here:
# lifecycle: Can kill most of this once falcon fully decomissioned
sub legacy_cache_recv {

	if (
		(req.backend == F_test && req.http.FT-Mock-Backend ~ "access")
		|| req.backend == F_access
		|| req.backend == F_access_test
	) {
		return (pass);
	} else {

		if (req.request != "GET" && req.request != "FASTLYPURGE" && req.http.FT-Skip-Cache != "no") {
			set req.http.FT-Skip-Cache = "Yes";
			set req.http.Debug-Skip-Cache = "SKIPPED";

			if (req.request == "HEAD") {
				set req.http.Debug-Skip-Cache = "SKIPPED: HEAD request";
			}

			return (pass);
		}

	}

	if (req.http.FT-Skip-Cache == "Yes") {
		return (pass);
	}

	return (lookup);
}

sub legacy_cache_fetch {

	# Don't cache stale responses delivered by the shield
	if (beresp.http.X-Is-Stale-Shield && !req.http.fastly-ff) {
		set beresp.ttl = 0s;
		set beresp.http.Cache-Control = "max-age=0, no-cache, no-store";
	} else if (!(
		beresp.http.Expires
		|| beresp.http.Surrogate-Control ~ "max-age"
		|| beresp.http.Cache-Control ~"(s-maxage|max-age)"
	) && !(beresp.http.Cache-Control ~"no-cache")) {
		if (req.http.FT-Debug) {
			set beresp.http.Debug-Default-TTL = "YES";
		}
		if (
			req.http.FT-Original-Url ~ "\.(aif|aiff|au|avi|bin|bmp|cab|carb|cct|cdf|class|css|doc|dcr)"
			|| req.http.FT-Original-Url ~ "\.(dtd|exe|flv|gcf|gff|gif|grv|hdml|hqx|ico|ini|jpeg|jpg|js)"
			|| req.http.FT-Original-Url ~ "\.(mov|mp3|nc|pct|pdf|png|ppc|pws|swa|swf|txt|vbs|w32|wav)"
			|| req.http.FT-Original-Url ~ "\.(wbmp|wml|wmlc|wmls|wmlsc|xsd|zip|bz2|webp|jxr|hdp|wdp|svg)"
		) {
			set beresp.ttl = 86400s; # 1 day if extension matches
			set beresp.http.Cache-Control = "max-age=86400";
		} else if (
			req.http.FT-Original-Url ~ "cms/275bc334-3063-11dc-9a81-0000779fd2ac.html"
			|| req.http.FT-Original-Url ~ "cms/782b3c3e-e239-11dd-b1dd-0000779fd2ac.html"
			|| req.http.FT-Original-Url ~ "/(authorisation|custom/ft2-com/portfolio/|techblog).*"
			|| req.http.FT-Original-Url ~ "/(intl/epaper|intl/premium-benefits|nbe/|openSearch/).*"
			|| req.http.FT-Original-Url ~ "/(registration/subscription-service/corporateAccessSignup).*"
		) {
			if (req.http.FT-Debug) {
				set beresp.http.Debug-Path-Match = "YES";
			}
			set beresp.ttl = 0s; # don't cache id path matches
			set beresp.http.Cache-Control = "max-age=0";
		} else if (req.url ~ "^/__access_metadata") {
			set beresp.ttl = 3600s; # 1 hour
			set beresp.http.Cache-Control = "max-age=3600";
		} else {
			set beresp.ttl = 30s;
			set beresp.http.Cache-Control = "max-age=30";
		}
	}

}

sub legacy_cache_deliver {
	# Let edge nodes know when the shield is serving stale content
	if (req.http.fastly-ff && fastly_info.state ~ "^HIT-STALE-") {
		set resp.http.X-Is-Stale-Shield = "Yes";
	}

	if (req.http.FT-Skip-Cache && req.http.FT-Skip-Cache != "no") {
		set resp.http.Cache-Control = "private, max-age=0, no-cache";
	}

	# just "private is not enough"
	if (resp.http.Cache-Control == "private") {
		set resp.http.Cache-Control = "private, max-age=0";
	}

}
