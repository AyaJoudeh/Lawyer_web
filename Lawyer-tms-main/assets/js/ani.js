/*global $ */
$("document").ready(function () {
	"use strict";
    

        <div class="box">
			<img src="https://www.shareicon.net/data/2016/09/01/822711_user_512x512.png" alt="user" width="100" />
			<h3>Welcome Admin</h3>
			<form>
		  <div class="form-group">
			
			<input type="email" class="form-control email" id="exampleInputEmail1" placeholder="Email" />
		  </div>
		  <div class="form-group">
			
			<input type="password" class="form-control password" id="exampleInputPassword1" placeholder="Password"/>
		  </div>
		  
		  <div class="checkbox text-left">
			<label>
			  <input type="checkbox" /> Remember Me
			</label>
		  </div>
		  	<button  class="btn btn-primary ">Submit</button>
				<div class=" text-right"><a href="" >Forgot the password?</a></div>
				
		</form>
	  </div>		

    })
    $("#logIn").click(function(){ $(".box").animate({
		top: "0px"
	}, 1000, function () {
		$(".box").animate({
			width: "400px"
		}, 1000, function () {
			$(".box").animate({
				height: "460px"
			}, 1000, function () {
				$(".box").animate({
					borderRadius: "10px"
				}, 1000, function () {
					$("img").fadeIn(1000, function () {
						$("h3").slideDown(1000, function () {
							$(".form-control").slideDown(1000, function () {
								$(".checkbox").show(700, function () {
									$(".checkbox").animate({left: "0px"}, 1000, function () {
										$(".btn-primary").slideDown(1000, function () {
											$("a").fadeIn(function () {
												$("a").animate({
													right: "0px"
												}, 1000);
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}); });