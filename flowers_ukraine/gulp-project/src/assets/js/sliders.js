function add_silder(container_node, arrow_node, elements_in_row){
    tns({
        container: container_node,
        items: elements_in_row,
        loop: false,
        navContainer: arrow_node,
        controlsContainer: arrow_node,
    });
}
