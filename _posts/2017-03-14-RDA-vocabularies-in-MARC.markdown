---
title: RDA value vocabularies in MARC 21
author: Gordon Dunsire
date: 2017-03-14 12:00:00
categories: RDA_Registry MARC_21
---

Many of the value vocabularies represented in the RDA Registry have been added to the [MARC 21 Genre/Form Code and Term Source Codes list](https://www.loc.gov/standards/sourcelist/genre-form.html).

23 vocabularies are listed in the [Technical Notice (March 10, 2017)](https://www.loc.gov/marc/relators/tn170310src.html).

The other 15 value vocabularies in RDA Vocabularies are not relevant to MARC 21, or are not accommodated as vocabulary encoding schemes in MARC 21.

The MARC source codes are the same strings as the prefixes suggested in the RDA Registry and registered on [prefix:cc](http://prefix:cc).

Note that the RDA Carrier type, Content type, and Media type value vocabularies are duplicated in [MARC 21 Term and code lists](http://www.loc.gov/standards/valuelist/index.html). These are maintained separately by the Library of Congress, as are the RDF representations in the [LC Linked Data Service](http://id.loc.gov).

The RDA vocabularies are relatively stable, with a foundation in the [RDA/ONIX Framework for Resource Categorization](http://www.rdaregistry.info/termList/#rof).

The source codes can be used in MARC 21 encoded data to identify the value vocabulary from which an instance value is taken. MARC 21 accommodates string values as labels or codes, and thing URIs in [subfield 0](https://www.loc.gov/marc/bibliographic/ecbdcntf.html) of the relevant tag. Of course, there is no need to identify the source if the URI for the vocabulary concept is stored, but the extra effort for little current benefit is easily dismissed. The label offers the best benefit; it can be displayed directly to the end-user without further processing. If only the source code and concept label are available, there is a good chance of using the label to identify the concept, and therefore its URI, for future linked data applications.

The RDA value vocabularies are represented using SKOS, so there is only one unique preferred label (used in RDA Toolkit) for each concept in each language. The label may change (nothing's perfect), but if this happens the RDA Steering Committee will take into account the impact on future retroconversion.

Meanwhile our advice, needless to say, is to record the concept URI if at all possible.

Gordon Dunsire
