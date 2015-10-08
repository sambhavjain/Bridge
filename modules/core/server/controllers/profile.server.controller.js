var mongoose = require('mongoose');
var editProfile = mongoose.model('Profile');
var fs = require('fs');

exports.editProfile = function(req, res){

			var newProfile = new editProfile();
			//newProfile.name = req.body.text;
			console.log('in editProfile func ' + req.body);
			newProfile.firstName = req.body.email;
			newProfile.save(function(err, newProfile) {
					if (err){

							return res.send(500, err);
					}
					console.log('successfully edited profile');
					//return res.json(newProfile);
				 res.send({state: 'success', newProfile: newProfile || null});
			});
		};
exports.editBanner = function (req, res) {
			//var profile = new editProfile();
			var profile = new editProfile();
		  var message = null;
			console.log('in profile api function');

		  if (profile) {
				console.log('in profile accepted');
		    fs.writeFile('./modules/core/client/img/banner/uploads/' + req.files.file.name, req.files.file.buffer, function (uploadError) {
		      if (uploadError) {
		        return res.status(400).send({
		          message: 'Error occurred while uploading profile picture'
		        });
		      } else {
		        profile.bannerImageURL = 'modules/core/client/img/banner/uploads/' + req.files.file.name;
						console.log('image uploaded');
						profile.save(function (saveError) {
		          if (saveError) {
		            return res.status(400).send({
		              message: errorHandler.getErrorMessage(saveError)
		            });
		          } else {
								console.log('image saved');
								res.send(profile);
		            // req.login(user, function (err) {
		            //   if (err) {
		            //     res.status(400).send(err);
		            //   } else {
		            //     res.json(user);
		            //   }
		             //});
		          }
		        });
		      }
		    });
		  } else {
		    res.status(400).send({
		      message: 'User is not signed in'
		    });
		  }
		};
