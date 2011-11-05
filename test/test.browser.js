// Twig.debug = true;

module("Remote");

// Test loading a template from a remote endpoint
test("blocking", function() {
    twig({
        id:   'remote',
        href: 'templates/test.twig',
        async: false
    });
    // Verify the template was saved
    equal( twig({ref: 'remote'}).render({
        test: "reload",
        flag: false
    }), "Test template = reload\n\n" );
});

// Test loading a template from a remote endpoint asynchronously
twig({
    id:   'remote',
    href: 'templates/test.twig',
    async: true,

    // Callback after template loads
    load: function(template) {
        // Defer test until the template is loaded
        test("remote.async", function() {
            // Render the template
            equal( template.render({
                test: "yes",
                flag: true
            }), "Test template = yes\n\nFlag set!" );

            // Verify the template was saved
            equal( twig({ref: 'remote'}).render({
                test: "reload",
                flag: false
            }), "Test template = reload\n\n" );

        });
    }
});
